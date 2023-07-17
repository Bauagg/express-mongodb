const mongoose = require('mongoose')

const orderItemsModels = mongoose.Schema({
    name: {
        type: String,
        minlength: [5, 'panjang nama minimal 5 krakter'],
        required: [true, 'name harus di isi'],
    },
    price: {
        type: Number,
        required: [true, 'price harus di isi']
    },
    qty: {
        type: Number,
        required: [true, 'qty harus di isi'],
        min: [1, 'quantitas minimal 1']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }

})

const OrderItem = mongoose.model('orderItem', orderItemsModels)

module.exports = OrderItem