const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Invoice = require('../invoice/models')

const orderModel = mongoose.Schema({
    status: {
        type: String,
        enum: ['waiting_payment', 'processing', 'in_delivery', 'delivered'],
        default: 'waiting_payment'
    },
    delivery_fee: {
        type: Number,
        default: 0
    },
    delivery_address: {
        provinsi: { type: String, required: [true, 'provinsi harus di isi'] },
        kabupaten: { type: String, required: [true, 'kabupaten harus di isi'] },
        kecamatan: { type: String, required: [true, 'kecamatan harus di isi'] },
        kelurahan: { type: String, required: [true, 'kelurahan harus di isi'] },
        detail: { type: String }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    order_items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItem'
    }]

}, { timestamps: true })

orderModel.plugin(AutoIncrement, { inc_field: 'order_number' })

orderModel.virtual('item_count').get(function () {
    return this.order_items.reduce((total, item) => total += parseInt(item.qty), 0)
})

orderModel.post('save', async function () {
    const sub_total = this.order_items.reduce((total, item) => total += (item.price * item.qty), 0)

    const newInvoice = new Invoice({
        user: this.user,
        order: this._id,
        order_number: this.order_number,
        sub_total: sub_total,
        delivery_fee: parseInt(this.deliveri_fee),
        total: parseInt(sub_total + this.deliveri_fee),
        delivery_address: this.delivery_address
    })

    await newInvoice.save()
})

const Order = mongoose.model('Order', orderModel)


module.exports = Order