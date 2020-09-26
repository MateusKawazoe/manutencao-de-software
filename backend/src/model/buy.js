const { Schema, model } = require('mongoose')

const buySchema = new Schema({
    produto_id: {
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

module.exports = model('buy',buySchema)