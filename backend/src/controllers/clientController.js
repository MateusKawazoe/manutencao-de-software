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
            return res.json('Cliente já cadastrado!')
        }

        await client.create({
            nome: nome,
            CPF: CPF,
            nascimento: nascimento
        })

        return res.json('Cliente cadastrado com sucesso!')
    },

    async showAll(req, res) {
        return res.json(await client.find())
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
            return res.json('Dados inválidos!')
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

        if(!nascimento){
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

        return res.json('Cliente atualizado com sucesso!')
    },

    async delete(req, res) {
        const {
            CPF
        } = req.body

        const exists = await client.find({
            CPF: CPF
        })

        if (!exists) {
            return res.json('Cliente não existe!')
        }

        await client.deleteOne({
            CPF: CPF
        })

        return res.json('Cliente excluído com sucesso!')
    }
}