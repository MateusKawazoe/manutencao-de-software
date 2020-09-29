const sell = require('../model/sell')
const product = require('../model/product')
const client = require('../model/client')

module.exports = {
    async store(req, res) {
        const {
            produto,
            cliente,
            quantidade,
            valor
        } = req.body

        var exists = await product.findOne({
            nome: produto
        })

        var clientExists = await client.findOne({
            nome: cliente
        })

        if (exists.quantidade < quantidade) {
            return res.json(3)
        }

        if (!clientExists) {
            return res.json(1)
        }

        if (!exists) {
            return res.json(1)
        } else {
            exists.quantidade = exists.quantidade - quantidade
            exists.precoVenda = ((quantidade * valor) + (exists.quantidade * exists.precoVenda)) / (quantidade + exists.quantidade)
        }

        await product.updateOne({
            nome: produto
        }, {
            $set: {
                quantidade: exists.quantidade,
                precoVenda: exists.precoVenda.toFixed(2)
            }
        })

        await sell.create({
            produto: produto,
            cliente: '' + clientExists.nome,
            quantidade: quantidade,
            valor: valor,
            data: new Date()
        })

        return res.json(2)
    },

    async showAll(req, res) {
        return res.json(await sell.find())
    },

    async showOne(req,res) {
        const {
            produto_id,
            cliente,
            quantidade,
            valor,
            data
        } = req.body

        const exists = await product.findOne({
            _id: produto_id
        })

        const aux = await sell.findOne({
            produto_id: produto_id,
            cliente: cliente,
            quantidade: quantidade,
            valor: valor,
            data: data
        })
        
        if(exists) {
            return res.json(aux)
        } else {
            return res.json(1)
        }
    },

    async delete(req, res) {
        const {
            produto,
            cliente,
            quantidade,
            valor,
            data
        } = req.body

        const aux = await sell.findOne({
            produto: produto,
            cliente: cliente,
            quantidade: quantidade,
            valor: valor,
            data: data
        })

        const exists = await product.findOne({
            nome: produto
        })

        if (!aux) {
            return res.json(1)
        }

        const valorVenda = (((exists.quantidade + quantidade) * exists.precoVenda) - (quantidade * valor)) / (exists.quantidade)

        await product.updateOne({
            nome: produto
        }, {
            $set: {
                quantidade: exists.quantidade + quantidade,
                precoVenda: valorVenda.toFixed(2)
            }
        })

        await sell.deleteOne({
            _id: aux._id
        })

        return res.json(2)
    }
}