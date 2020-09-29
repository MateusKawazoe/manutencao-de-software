const buy = require('../model/buy')
const product = require('../model/product')
const { showOne } = require('./productController')

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
        } else {
            exists.quantidade = exists.quantidade + quantidade
            const porcentProduto = (exists.precoCompra / (exists.precoCompra + valor))
            const porcentCompra = (valor / (exists.precoCompra + valor))
            exists.precoCompra = (valor * porcentCompra) + (exists.precoCompra * porcentProduto)
        }

        await product.updateOne({
                _id: produto_id
            }, {
                $set: {
                    quantidade: exists.quantidade,
                    precoCompra: exists.precoCompra.toFixed(2)
                }
            }
        )

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

        if(exists){
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

        const coef = (quantidade / exists.quantidade)
        const valorCompra = (exists.precoCompra - ( coef * valor))
        const valorProduto = valorCompra / (1 - coef)

        await product.updateOne({
            _id: produto_id
        }, {
            $set: {
                quantidade: exists.quantidade - quantidade,
                precoCompra: (valorProduto/1.12).toFixed(2)
            }
        })

        await buy.deleteOne({
            _id: aux._id
        })

        return res.json(2)
    }
}