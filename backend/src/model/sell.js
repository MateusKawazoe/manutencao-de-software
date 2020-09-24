const { Schema, model } = require('mongoose')

const sellSchema = new Schema({
    produto: {},
    cliente: {
        type: Number,
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