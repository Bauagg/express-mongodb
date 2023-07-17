const Tags = require('./models-tags')

const getTags = async (req, res, next) => {
    try {
        const newTags = await Tags.find()

        res.status(200).json({
            error: false,
            message: 'get data succesfully',
            datas: newTags
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

const postTags = async (req, res, next) => {
    try {
        const newTags = await Tags.create({ name: req.body.name })

        res.status(201).json({
            error: false,
            message: 'create data succesfully',
            datas: newTags
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

const updateTags = async (req, res, next) => {
    try {
        const newTags = await Tags.updateOne({ _id: Object(req.params.id) }, { name: req.body.name })

        if (newTags.modifiedCount === 1) {
            return res.status(201).json({
                error: false,
                message: 'update data succesfully',
                datas: newTags
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
                fields: err.fields
            })
        }
        next(err)
    }
}

const deleteTags = async (req, res, next) => {
    try {
        await Tags.deleteOne({ _id: Object(req.params.id) })

        res.status(200).json({
            error: false,
            message: 'delete data succesfully'
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
    getTags,
    postTags,
    updateTags,
    deleteTags
}