const Order = require('./models')
const Cart = require('../cart/models_cart')
const DeliveryAddress = require('../adress-delivery/modeles')
const OrderItem = require('../order-item/models-items')

const { Types } = require('mongoose')

const getOrder = async (req, res, next) => {
    try {
        const { skip = 0, limit = 0 } = req.query

        const orders = await Order.find({ user: req.user._id })

        const newOrder = await Order.find({ user: req.user._id })
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .populate('order_items')
            .sort('-createdAt')

        res.status(200).json({
            error: false,
            message: 'get data order succesfully',
            data: orders.map((order) => order.toJSON({ virtuals: true })),
            order: newOrder
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

const postOrder = async (req, res, next) => {
    try {
        const { delivery_address, delivery_fee } = req.body

        const items = await Cart.find({ user: req.user._id }).populate('product')
        console.log(items)

        if (!items || items.length === 0) {
            return res.status(200).json({
                message: `Anda tidak membuat pesanan karena Anda tidak memiliki barang di keranjang`
            })
        }

        const address = await DeliveryAddress.findById(delivery_address)

        const newOrder = new Order({
            _id: new Types.ObjectId(),
            status: 'waiting_payment',
            delivery_fee: delivery_fee,
            delivery_address: {
                provinsi: address.provinsi,
                kabupaten: address.kabupaten,
                kecamatan: address.kecamatan,
                kelurahan: address.kelurahan,
                detail: address.detail
            },
            user: req.user._id
        })

        const orderItem = await OrderItem.insertMany(items.map((item) => ({
            ...item,
            name: item.name,
            qty: parseInt(item.qty),
            price: parseInt(item.price),
            order: newOrder._id,
            product: item._id
        })))

        orderItem.forEach(element => {
            newOrder.order_items.push(element)
        });

        newOrder.save()


        await Cart.deleteMany({ user: req.user._id })

        res.status(201).json({
            error: false,
            message: 'post data Success',
            order: newOrder
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

module.exports = { getOrder, postOrder }