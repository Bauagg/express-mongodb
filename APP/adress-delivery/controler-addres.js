const { subject } = require('@casl/ability')
const AddressDelivery = require('./modeles')

const { policyFor } = require('../../utils/otorisasi')

const getDeliveryAddress = async (req, res, next) => {
    try {
        const newDeliveryAddress = await AddressDelivery.find({ user: req.user._id }).populate('user')

        res.status(200).json({
            error: false,
            message: 'get data succesfully',
            datas: newDeliveryAddress
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

const postDeliveryAddress = async (req, res, next) => {
    try {
        const payload = req.body

        const newDeliveryAddress = await AddressDelivery.create({ ...payload, user: req.user._id })

        res.status(201).json({
            error: false,
            message: 'create data succesfully',
            datas: newDeliveryAddress
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

const updateDeliveryAddress = async (req, res, next) => {
    try {
        const { _id, ...payload } = req.body

        let addres = await AddressDelivery.findById(req.params.id)

        if (!addres) {
            res.status(404).json({
                error: true,
                message: 'Address not fount'
            })
        }

        const subjectAddress = subject('DeliveryAdress', { ...addres, user_id: addres.user })

        if (!policyFor(req.user).can('update', subjectAddress)) {
            res.status(300).json({
                error: true,
                message: 'You are not allowed to modify these resources'
            })
        }

        addres = await AddressDelivery.findByIdAndUpdate(req.params.id, payload, { new: true })

        res.status(201).json({
            error: false,
            message: 'update data succesfully',
            datas: addres
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

const deleteDeliveryAddress = async (req, res, next) => {
    try {
        let newDeliveryAddress = await AddressDelivery.findById(req.params.id)

        if (!newDeliveryAddress) {
            res.status(404).json({
                error: true,
                message: 'Address not Fount'
            })
        }

        const subjectAddress = subject('DeliveryAdress', { ...newDeliveryAddress, user_id: newDeliveryAddress.user })

        if (!policyFor(req.user).can(subjectAddress)) {
            res.status(300).json({
                error: true,
                message: 'You are not allowed to modify these resources'
            })
        }

        newDeliveryAddress = await AddressDelivery.findByIdAndDelete(req.params.id)

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
    getDeliveryAddress,
    postDeliveryAddress,
    updateDeliveryAddress,
    deleteDeliveryAddress
}