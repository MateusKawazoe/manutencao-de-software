const client = require('../model/client')

module.exports = {
    async store(req, res) {
        const {
            nome,
            CPF,
            nascimento
        } = req.body

        const exists = await client.findOne({
            CPF: CPF
        })

        if (exists) {
            return res.json(1)
        }

        await client.create({
            nome: nome,
            CPF: CPF,
            nascimento: nascimento
        })

        return res.json(2)
    },

    async showAll(req, res) {
        return res.json(await client.find())
    },

    async showOneByName(req, res) {
        const {
            nome
        } = req.body

        const exists = await client.findOne({
            nome: nome
        })

        if (exists) {
            return res.json(exists)
        } else {
            return res.json(1)
        }
    },

    async showOne(req, res) {
        const {
            CPF
        } = req.body

        const exists = await client.findOne({
            CPF: CPF
        })

        if (exists) {
            return res.json(exists)
        } else {
            return res.json(1)
        }
    },

    async showOneById(req, res) {
        const {
            cliente
        } = req.body

        const exists = await client.findOne({
            _id: cliente
        })

        if(exists) {
            return res.json(exists)
        } else {
            return 1
        }
    },

    async update(req, res) {
        const {
            nome,
            CPF,
            nascimento
        } = req.body
        var auxNome, auxCPF, auxNascimento

        const exists = await client.findOne({
            CPF: CPF
        })

        if (!exists) {
            return res.json(1)
        }

        if (!nome) {
            auxNome = exists.nome
        } else {
            auxNome = nome
        }

        if (!CPF) {
            auxCPF = exists.CPF
        } else {
            auxCPF = CPF
        }

        if (!nascimento) {
            auxNascimento = exists.nascimento
        } else {
            auxNascimento = nascimento
        }

        await client.updateOne({
            CPF: auxCPF
        }, {
            $set: {
                nome: auxNome,
                CPF: auxCPF,
                nascimento: auxNascimento
            }
        })

        return res.json(2)
    },

    async delete(req, res) {
        const {
            CPF
        } = req.body

        const exists = await client.find({
            CPF: CPF
        })

        if (!exists) {
            return res.json(1)
        }

        await client.deleteOne({
            CPF: CPF
        })

        return res.json(2)
    }
}