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
            return res.json(1)
        }

        await distributor.create({
            nome: nome,
            CNPJ: CNPJ
        })

        return res.json(2)
    },

    async showAll(req, res) {
        return res.json(await distributor.find())
    },

    async showOne(req, res) {
        const {
            CNPJ
        } = req.body

        const exists = await distributor.findOne({
            CNPJ: CNPJ
        })

        if(exists) {
            return res.json(exists)
        } else {
            return res.json(1)
        }
    },

    async update(req, res) {
        const {
            nome,
            CNPJ
        } = req.body
        var auxNome

        const exists = await distributor.findOne({
            CNPJ: CNPJ
        })

        if (!exists) {
            return res.json(1)
        }

        if (!nome) {
            return res.json(3)
        }

        await distributor.updateOne({
            CNPJ: CNPJ
        }, {
            $set: {
                nome: nome
            }
        })

        return res.json(2)
    },

    async delete(req, res) {
        const { CNPJ } = req.body

        const exists = await distributor.find({
            CNPJ: CNPJ
        })

        if(!exists) {
            return res.json(1)
        }

        await distributor.deleteOne({
            CNPJ: CNPJ
        })

        return res.json(2)
    }
}