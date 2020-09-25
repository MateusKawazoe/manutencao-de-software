const distributor = require('../model/distributor')

module.exports = {
    async store(req, res) {
        const {
            nome,
            cnpj
        } = req.body

        const exists = await distributor.findOne({
            cnpj: cnpj
        })

        if (exists) {
            return res.json('Distribuidor já cadastrado!')
        }

        await distributor.create({
            nome: nome,
            cnpj: cnpj
        })

        return res.json('Distribuidor cadastrado com sucesso!')
    },

    async showAll(req, res) {
        return res.json(await distributor.find())
    },

    async update(req, res) {
        const {
            nome,
            cnpj
        } = req.body
        var auxNome, auxCnpj

        const exists = await distributor.findOne({
            cnpj: cnpj
        })

        if (!exists) {
            return res.json('Distribuidor não existe!')
        }

        if (!nome) {
            auxNome = exists.nome
        }

        if (!cnpj) {
            auxCnpj = exists.cnpj
        }

        await distributor.updateOne({
            cnpj: auxCnpj
        }, {
            $set: {
                nome: auxNome,
                cnpj: auxCnpj
            }
        })

        return res.json('Distribuidor atualizado com sucesso!')
    },

    async delete(req, res) {
        const { cnpj } = req.body

        const exists = await distributor.find({
            cnpj: cnpj
        })

        if(!exists) {
            return res.json('Distribuidor não existe!')
        }

        await distributor.deleteOne({
            cnpj: cnpj
        })

        return res.json('Distribuidor excluído com sucesso!')
    }
}