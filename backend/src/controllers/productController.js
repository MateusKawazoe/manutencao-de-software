const product = require('../model/product')
const distributor = require('../model/distributor')

module.exports = {
    async store(req, res) {
        const {
            nome,
            fornecedor,
            quantidade,
            precoCompra,
            precoVenda
        } = req.body

        const fornecedorExists = await distributor.findOne({
            CNPJ: fornecedor.CNPJ
        })

        if (!fornecedorExists) {
            await distributor.create({
                nome: fornecedor.nome,
                CNPJ: fornecedor.CNPJ
            })
        }

        const exists = await product.findOne({
            nome: nome,
            fornecedor: fornecedor
        })

        if (exists) {
            return res.json('Produto já cadastrado!')
        }

        await product.create({
            nome: nome,
            fornecedor: fornecedor,
            quantidade: quantidade,
            precoCompra: precoCompra,
            precoVenda: precoVenda
        })

        return res.json('Produto cadastrado com sucesso!')
    },

    async showAll(req, res) {
        return res.json(await product.find())
    },

    async showOne(req, res) {
        const {
            nome,
            fornecedor
        } = req.body

        const exists = await product.findOne({
            nome: nome,
            fornecedor: fornecedor
        })

        if(exists) {
            return res.json(exists)
        } else {
            return res.json('Produto não existe!')
        }
    },

    async update(req, res) {
        const {
            nome,
            novoNome,
            fornecedor,
            quantidade,
            precoCompra,
            precoVenda
        } = req.body

        var auxNome, auxQuantidade, auxPrecoVenda, auxPrecoCompra

        const exists = await product.findOne({
            nome: nome,
            fornecedor: fornecedor
        })

        if (!exists) {
            return res.json('Produto não cadastrado!')
        }

        if (!novoNome) {
            auxNome = exists.nome
        } else {
            auxNome = novoNome
        }

        if (!quantidade) {
            auxQuantidade = exists.quantidade
        } else {
            auxQuantidade = quantidade
        }

        if (!precoCompra) {
            auxPrecoCompra = exists.precoCompra
        } else {
            auxPrecoCompra = precoCompra
        }

        if (!precoVenda) {
            auxPrecoVenda = exists.precoVenda
        } else {
            auxPrecoVenda = precoVenda
        }

        await product.updateOne({
            _id: exists._id
        }, {
            $set: {
                nome: auxNome,
                quantidade: auxQuantidade,
                precoCompra: auxPrecoCompra,
                precoVenda: auxPrecoVenda
            }
        })

        return res.json('Produto atualizado com sucesso!')
    },

    async delete(req, res) {
        const {
            nome,
            fornecedor
        } = req.body

        const exists = await product.findOne({
            nome: nome,
            fornecedor: fornecedor
        })

        if (!exists) {
            return res.json('Produto não existe!')
        }

        await product.deleteOne({
            nome: nome,
            fornecedor: fornecedor
        })

        return res.json('Produto excluído com sucesso!')
    }
}