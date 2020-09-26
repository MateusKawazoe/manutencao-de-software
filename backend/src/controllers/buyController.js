const buy = require('../model/buy')
const product = require('../model/product')

module.exports = {
    async store(req, res) {
        const {
            produto,
            quantidade,
            valor
        } = req.body

        var exists = await product.findOne({
            _id: produto._id
        })

        if (!exists) {
            return res.status(401).json('Produto não existe!')
        } else {
            exists.quantidade = exists.quantidade + quantidade
            const porcentProduto = (exists.precoCompra / (exists.precoCompra + valor))
            const porcentCompra = (valor / (exists.precoCompra + valor))
            exists.precoCompra = (valor * porcentCompra) + (exists.precoCompra * porcentProduto)
        }

        await product.updateOne({
                _id: produto._id
            }, {
                $set: {
                    quantidade: exists.quantidade,
                    precoCompra: exists.precoCompra
                }
            }
        )

        await buy.create({
            produto: exists,
            quantidade: quantidade,
            valor: valor,
            data: new Date()
        })

        return res.json('Compra efetuada!')
    },

    async showAll(req, res) {
        return res.json(await buy.find())
    },

    async delete(req, res) {
        const {
            produto,
            quantidade,
            valor,
            data
        } = req.body

        const exists = await product.findOne({
            _id: produto
        })

        console.log(exists)

        const aux = await buy.findOne({
            // produto: exists
            quantidade: quantidade,
            valor: valor,
            data: data
        })

        if (!aux) {
            return res.status(401).json('Compra não cadastrada!')
        }

        const coef = (quantidade / exists.quantidade)
        const valorCompra = (exists.precoCompra - ( coef * valor))
        const valorProduto = valorCompra / (1 - coef)


        await product.updateOne({
            _id: produto
        }, {
            $set: {
                quantidade: exists.quantidade - quantidade,
                precoCompra: Math.round(valorProduto/1.12)
            }
        })

        await buy.deleteOne({
            _id: aux._id
        })

        return res.json('Compra excluída com sucesso!')
    }
}