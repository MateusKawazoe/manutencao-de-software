const user = require("../model/user")
const auth_token = require('../services/auth')
const md5 = require("md5");

module.exports = {
	async signup(req, res) {
		const {
			usuario,
			senha
		} = req.body;

		const userExists = await user.findOne({
			usuario
		})

		if (userExists) {
			return res.json(1)
		}

		const token = await auth_token.generateToken({
			usuario: usuario,
			senha: md5(senha + global.SALT_KEY)
		})

		await user.create({
			usuario: usuario,
			senha: md5(senha + global.SALT_KEY),
			token: token
		})

		return res.status(201).json(token)
	},

	async signin(req, res) {
		const {
			usuario,
			senha,
			token
		} = req.body

		const userExists = await user.findOne({
			usuario
		})

		if (!userExists) {
			return res.json(1)
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
					return res.json(2)
				}
			}
		}
	},

	async showAll(req, res) {
		return res.json(await user.find())
	},

	async delete(req, res) {
		const {
			usuario
		} = req.body

		return res.json(await user.deleteOne({
			usuario
		}))
	}
}