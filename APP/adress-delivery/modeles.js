const mongoose = require('mongoose')

const deliveryAdressModels = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name harus di isi'],
        maxlength: [250, 'panjang maksimal nama alamat adalah 255 karakter']
    },
    kelurahan: {
        type: String,
        required: [true, 'kelurahan / desa harus di isi'],
        maxlength: [255, 'panjang maksimal kelurahan / desa alamat adalah 255 karakter']
    },
    kecamatan: {
        type: String,
        required: [true, 'kecamatan harus di isi'],
        maxlength: [255, 'panjang maksimal kecamatan alamat adalah 255 karakter']
    },
    kabupaten: {
        type: String,
        required: [true, 'kabupaten harus di isi'],
        maxlength: [255, 'panjang maksimal kabupaten alamat adalah 255 karakter']
    },
    provinsi: {
        type: String,
        required: [true, 'name harus di isi'],
        maxlength: [255, 'panjang maksimal provinsi alamat adalah 255 karakter']
    },
    detail: {
        type: String,
        required: [true, 'alamat detail harus di isi']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

const DeliveryAddress = mongoose.model('deliveryAdress', deliveryAdressModels)

module.exports = DeliveryAddress