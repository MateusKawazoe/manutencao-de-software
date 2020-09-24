const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    fornecedor: {
        type: Number,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    precoCompra: {
        type: Number,
        required: true
    },
    precoVenda: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('product',productSchema)