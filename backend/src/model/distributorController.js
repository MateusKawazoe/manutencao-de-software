const { Schema, model } = require('mongoose')

const distributorSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    CNPJ: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('distributor',distributorSchema)