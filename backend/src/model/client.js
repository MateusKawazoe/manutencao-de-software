const { Schema, model } = require('mongoose')

const clientSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    CPF: {
        type: String,
        required: true
    },
    nascimento: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('client',clientSchema)