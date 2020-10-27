const buy = require('../model/buy')
const product = require('../model/product')

module.exports = {
    async store(req, res) {
        const {
            produto_id,
            quantidade,
            valor
        } = req.body

        var exists = await product.findOne({
            _id: produto_id
        })

        if (!exists) {
            return res.json(1)
        } 

        const valorCompra = quantidade * valor
        const valorExistente = exists.quantidade * exists.precoCompra
        const quantidadeTotal = parseInt(quantidade) + parseInt(exists.quantidade)

        await product.updateOne({
            _id: produto_id
        }, {
            $set: {
                quantidade: quantidadeTotal,
                precoCompra: ((valorCompra + valorExistente) / quantidadeTotal).toFixed(2)
            }
        })

        await buy.create({
            produto_id: produto_id,
            quantidade: quantidade,
            valor: valor,
            data: new Date()
        })

        return res.json(2)
    },

    async showAll(req, res) {
        return res.json(await buy.find())
    },

    async showOne(req, res) {
        const {
            produto_id,
            quantidade,
            valor,
            data
        } = req.body

        const exists = await buy.findOne({
            produto_id: produto_id,
            quantidade: quantidade,
            valor: valor,
            data: data
        })

        if (exists) {
            return res.json(exists)
        } else {
            return res.json(1)
        }
    },

    async delete(req, res) {
        const {
            produto_id,
            quantidade,
            valor,
            data
        } = req.body

        const exists = await product.findOne({
            _id: produto_id
        })

        const aux = await buy.findOne({
            produto_id: produto_id,
            quantidade: quantidade,
            valor: valor,
            data: data
        })

        if (!aux) {
            return res.json(1)
        }
        
        const valorCompra = quantidade * valor
        const valorExistente = exists.precoCompra * exists.quantidade
        const quantidadeTotal = exists.quantidade - quantidade

        await product.updateOne({
            _id: produto_id
        }, {
            $set: {
                quantidade: quantidadeTotal,
                precoCompra: (valorExistente - valorCompra) / quantidadeTotal
            }
        })

        await buy.deleteOne({
            _id: aux._id
        })

        return res.json(2)
    }
}