const user = require("../model/user")
const auth_token = require('../services/auth')
const md5 = require("md5")

module.exports = {
	async singup(req, res) {
		const {
			nome,
			sobrenome,
			usuario,
			senha
		} = req.body;

		const userExists = await user.findOne({
			usuario
		})

		if (userExists) {
			return res.status(401).json("Usuário já cadastrado!")
		}

		const token = await auth_token.generateToken({
			nome: nome,
			sobrenome: sobrenome,
			usuario: usuario,
			senha: md5(senha + global.SALT_KEY)
		})

		const aux = await user.create({
			nome: nome,
			sobrenome: sobrenome,
			usuario: usuario,
			senha: md5(senha + global.SALT_KEY),
			token: token
		})

		return res.status(201).json("Cadastro realizado com sucesso!" + aux)
	},

	async singin(req, res) {
		const {
			usuario,
			senha,
			token
		} = req.body

		const userExists = await user.findOne({
			usuario
		})

		if (!userExists) {
			return res.status(401).json("Usuário não existe!")
		}

		if (userExists.token) {
			if (userExists.token == token) {
				return res.status(201).json(token)
			} else {
				if (userExists.senha == md5(senha + global.SALT_KEY)) {
					var auxToken

					if (token) {
						auxToken = token
					} else {
						auxToken = await auth_token.generateToken({
							nome: userExists.nome,
							sobrenome: userExists.sobrenome,
							usuario: userExists.usuario,
							senha: md5(userExists.senha + global.SALT_KEY)
						})
					}

					await user.updateOne({
						usuario
					}, {
						$set: {
							token: auxToken
						}
					})

					return res.status(201).json(auxToken)
				} else {
					return res.status(401).json("Senha inválida!")
				}
			}
		}
	},
}