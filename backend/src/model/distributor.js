const { Schema, model } = require('mongoose')

const distributorSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    CNPJ: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('distributor',distributorSchema)