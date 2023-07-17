const mongoose = require('mongoose')

const tagsModel = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name harus di isi'],
        minlenth: [3, 'min carakter 3 carakter'],
        maxlengtth: [20, 'max carakter 20 crakter']
    }
})

const Tags = mongoose.model('tags', tagsModel)

module.exports = Tags