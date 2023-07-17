const mongoose = require('mongoose')

const productModels = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name harus di isi']
    },
    descriptions: {
        type: String,
        maxlength: [1000, 'descriptions max 1000 kararakter'],
        required: [true, 'descriptions harus di isi']
    },
    stock: {
        type: Number,
        required: [true, 'stock harus di isi']
    },
    price: {
        type: Number,
        require: [true, 'price harus di isi']
    },
    status: {
        type: Boolean,
        default: false
    },
    image: { type: String },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tags'
    }]
})

const Product = mongoose.model('product', productModels)

module.exports = Product