const { Schema, model } = require('mongoose')

const sellSchema = new Schema({
    produto: {
        type: String,
        required: true
    },
    cliente: {
        type: String,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    data: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('sell',sellSchema)