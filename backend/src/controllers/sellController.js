const sell = require('../model/sell')
const product = require('../model/product')
const client = require('../model/client')

module.exports = {
    async store(req, res) {
        const {
            produto_id,
            CPF,
            quantidade,
            valor
        } = req.body

        var exists = await product.findOne({
            _id: produto_id
        })

        var clientExists = await client.findOne({
            CPF: CPF
        })

        if (exists.quantidade < quantidade) {
            return res.json('Não existe a quantidade suficiente do produto!')
        }

        if (!clientExists) {
            clientExists = await client.create(cliente)
        }

        if (!exists) {
            return res.status(401).json('Produto não existe!')
        } else {
            exists.quantidade = exists.quantidade - quantidade
            exists.precoVenda = ((quantidade * valor) + (exists.quantidade * exists.precoVenda)) / (quantidade + exists.quantidade)
        }

        await product.updateOne({
            _id: produto_id
        }, {
            $set: {
                quantidade: exists.quantidade,
                precoVenda: exists.precoVenda.toFixed(2)
            }
        })

        await sell.create({
            produto_id: produto_id,
            cliente: clientExists._id,
            quantidade: quantidade,
            valor: valor,
            data: new Date()
        })

        return res.json('Venda efetuada!')
    },

    async showAll(req, res) {
        return res.json(await sell.find())
    },

    async delete(req, res) {
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

        if (!aux) {
            return res.status(401).json('Venda não cadastrada!')
        }

        const valorVenda = (((exists.quantidade + quantidade) * exists.precoVenda) - (quantidade * valor)) / (exists.quantidade)

        await product.updateOne({
            _id: produto_id
        }, {
            $set: {
                quantidade: exists.quantidade + quantidade,
                precoVenda: valorVenda.toFixed(2)
            }
        })

        await sell.deleteOne({
            _id: aux._id
        })

        return res.json('Venda excluída com sucesso!')
    }
}