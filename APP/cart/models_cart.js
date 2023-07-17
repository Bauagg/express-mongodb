const mongoose = require('mongoose')

const cartModels = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'nama harus di isi'],
        minlength: [5, 'panjang nama product minimal 5 karakter']
    },
    qty: {
        type: Number,
        required: [true, 'qty harus di isi'],
        min: [1, 'minimal qty adalah 1']
    },
    price: {
        type: Number,
        default: 0
    },
    Image_url: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }
}, { timestamps: true })

const Cart = mongoose.model('cart', cartModels)

module.exports = Cart