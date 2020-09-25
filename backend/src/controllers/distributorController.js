const distributor = require('../model/distributor')

module.exports = {
    async store(req, res) {
        const {
            nome,
            CNPJ
        } = req.body

        const exists = await distributor.findOne({
            CNPJ: CNPJ
        })

        if (exists) {
            return res.json('Distribuidor já cadastrado!')
        }

        await distributor.create({
            nome: nome,
            CNPJ: CNPJ
        })

        return res.json('Distribuidor cadastrado com sucesso!')
    },

    async showAll(req, res) {
        return res.json(await distributor.find())
    },

    async update(req, res) {
        const {
            nome,
            CNPJ
        } = req.body
        var auxNome, auxCNPJ

        const exists = await distributor.findOne({
            CNPJ: CNPJ
        })

        if (!exists) {
            return res.json('Distribuidor não existe!')
        }

        if (!nome) {
            auxNome = exists.nome
        }

        if (!CNPJ) {
            auxCNPJ = exists.CNPJ
        }

        await distributor.updateOne({
            CNPJ: auxCNPJ
        }, {
            $set: {
                nome: auxNome,
                CNPJ: auxCNPJ
            }
        })

        return res.json('Distribuidor atualizado com sucesso!')
    },

    async delete(req, res) {
        const { CNPJ } = req.body

        const exists = await distributor.find({
            CNPJ: CNPJ
        })

        if(!exists) {
            return res.json('Distribuidor não existe!')
        }

        await distributor.deleteOne({
            CNPJ: CNPJ
        })

        return res.json('Distribuidor excluído com sucesso!')
    }
}