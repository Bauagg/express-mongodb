const Category = require('./models-category')

const getCategory = async (req, res, next) => {
    try {
        const newCategory = await Category.find()

        res.status(200).json({
            error: false,
            message: 'get data berhasil',
            datas: newCategory
        })
    } catch (err) {
        if (err && err.name === 'ValidtionError') {
            res.status(400).json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

const postCategory = async (req, res, next) => {
    try {
        const newCategory = await Category.create({ name: req.body.name })

        res.status(201).json({
            error: false,
            message: 'create data succesfuly',
            datas: newCategory
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

const updateCategory = async (req, res, next) => {
    try {
        const newCategory = await Category.updateOne({ _id: Object(req.params.id) }, { name: req.body.name })

        if (newCategory.modifiedCount === 1) {
            return res.status(201).json({
                error: false,
                message: 'update category succesfully',
                datas: newCategory
            })
        } else {
            return res.status(200).json({
                error: false,
                message: 'data is not update'
            })
        }
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            res.status.json({
                error: true,
                message: err.message,
                fields: err.fields
            })
        }
        next(err)
    }
}

const deleteCategoy = async (req, res, next) => {
    try {
        await Category.deleteOne({ _id: Object(req.params.id) })

        res.status(200).json({
            error: false,
            message: 'delete data succesfully'
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

module.exports = {
    getCategory,
    postCategory,
    updateCategory,
    deleteCategoy
}