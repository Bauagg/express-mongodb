const Cart = require('./models_cart')
const Product = require('../product/models_product')

const getCart = async (req, res, next) => {
    try {
        const newCart = await Cart.find({ user: req.user._id }).populate('product')

        res.status(200).json({
            error: false,
            message: 'get data succesfully',
            datas: newCart
        })
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

const putCart = async (req, res, next) => {
    try {
        const { items } = req.body

        if (!items || !Array.isArray(items)) {
            res.status(401).json({
                error: true,
                message: 'invalid items data'
            })
        }

        const productIds = items.map((item) => item.product.id)

        const newProduct = await Product.find({ _id: { $in: productIds } })

        let cartItems = items.map((item) => {
            let relateProduct = newProduct.find((product) => product._id.toString() === item.product.id)

            return {
                product: relateProduct._id,
                price: relateProduct.price,
                image: relateProduct.image,
                name: relateProduct.name,
                user: req.user._id,
                qty: item.qty
            }
        })

        await Cart.deleteMany({ user: req.user.id })

        await Cart.bulkWrite(cartItems.map((item) => {
            return {
                updateOne: {
                    filter: {
                        user: req.user.id,
                        product: item.product
                    },
                    update: item,
                    upsert: true
                }
            }
        }))

        res.status(201).json({
            error: false,
            message: 'Update Success',
            datas: cartItems
        })
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

module.exports = {
    getCart,
    putCart
}