const mongoose = require('mongoose')

const categoryModels = mongoose.Schema({
    name: {
        type: String,
        minlength: [3, 'paanjang name minimal 3'],
        maxlength: [20, 'panjang nama max 20'],
        required: [true, 'name harus di isi']
    }
})

const Category = mongoose.model('category', categoryModels)

module.exports = Category