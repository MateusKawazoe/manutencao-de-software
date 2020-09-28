const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    usuario: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('user',userSchema)