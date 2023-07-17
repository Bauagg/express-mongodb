const Product = require('./models_product')
const Category = require('../category/models-category')
const Tags = require('../tags/models-tags')

const getProduct = async (req, res, next) => {
    try {
        const { skip = 0, limit = 4, q = '', searchCategory = '', searchTags = [] } = req.query
        let criteria = {}

        if (q.length) {
            criteria = {
                ...criteria, name: { $regex: q, $opsiont: 'i' }
            }
        }

        if (searchCategory.length) {
            const categoryResoul = await Category.findOne({ name: { $regex: searchCategory, $options: 'i' } })

            criteria = { ...criteria, category: categoryResoul._id }
        }

        if (searchTags.length) {
            const tagsResoul = await Tags.find({ $in: Tags })

            if (tagsResoul.length > 0) {
                payload = { ...payload, tags: tagsResoul.map((tag) => tag._id) }
            }
        }

        const newProduct = await Product.find(criteria).skip(parseInt(skip)).limit(parseInt(limit))
            .populate('category').populate('tags')

        res.status(200).json({
            error: false,
            message: 'get data berhasil',
            datas: newProduct
        })
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

const getProductById = async (req, res, next) => {
    try {
        const newProduct = await Product.findById(req.params.id).populate('category').populate('tags')

        res.status(200).json(newProduct)
    } catch (err) {
        if (err && err.name === 'ValidateError') {
            return res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

const createProduct = async (req, res, next) => {
    try {
        let payload = req.body

        // relasional one tu many
        if (payload.category) {
            let newCategory = await Category.findOne({ name: { $regex: payload.category, $options: 'i' } })

            if (newCategory) {
                payload = { ...payload, category: newCategory._id }
            } else {
                delete payload.category
            }
        }

        // relasional many to many
        if (payload.tags && payload.tags.length > 0) {
            const newTags = await Tags.find({ name: { $in: payload.tags } })

            if (newTags.length) {
                payload = { ...payload, tags: newTags.map((tag) => tag._id) }
            } else {
                delete payload.tags
            }
        }

        const newProduct = await Product.create({ ...payload })

        res.status(201).json({
            error: false,
            message: 'create product succesfuly',
            datas: newProduct
        })
    } catch (err) {
        if (err && err.name === 'ValidateError') {
            return res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        let payload = req.body
        if (payload.category) {
            let newCategory = await Category.findOne({ name: { $regex: payload.category, $options: 'i' } })

            if (newCategory) {
                payload = { ...payload, category: newCategory._id }
            } else {
                delete payload.category
            }
        }

        if (payload.tags && payload.tags.length > 0) {
            const newTags = await Tags.find({ name: { $in: payload.tags } })

            if (newTags) {
                payload = { ...payload, tags: newTags.map((tag) => tag._id) }
            } else {
                delete payload.tags
            }
        }

        const newProduct = await Product.updateOne({ _id: req.params.id }, { ...payload })

        if (newProduct.modifiedCount === 1) {
            return res.status(201).json({
                error: false,
                message: 'data berhasil di update',
                datas: newProduct
            })
        } else {
            return res.status(200).json({
                error: false,
                message: 'data is not update'
            })
        }
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            res.status(400).json({
                error: true,
                message: err.message,
                filds: err.fields
            })
        }
        next(err)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        await Product.deleteOne({ _id: Object(req.params.id) })

        res.status(200).json({
            error: false,
            message: 'delete product succesfuly',
        })
    } catch (err) {
        if (err && err.name === 'ValidateError') {
            return res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

module.exports = {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}