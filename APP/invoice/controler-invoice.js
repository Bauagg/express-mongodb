const Invoice = require('./models')

const { policyFor } = require('../../utils/otorisasi')

const { subject } = require('@casl/ability')

const getInvoice = async (req, res, next) => {
    try {
        const newInvoice = await Invoice.findOne({ order: req.params.id, user: req.user._id }).populate('order')

        if (!newInvoice) {
            return res.status(404).json({
                error: true,
                message: 'invoice not found'
            })
        }

        const subjectInvoice = subject('Invoice', { ...newInvoice, user_id: newInvoice.user_id })

        if (!policyFor(req.user).can('read', subjectInvoice)) {
            return res.status(401).json({
                error: true,
                message: 'anda tidak memiliki akses inivoice ini'
            })
        }

        res.status(200).json({
            error: false,
            message: 'get data invoice succesfully',
            datas: newInvoice
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

module.exports = { getInvoice }