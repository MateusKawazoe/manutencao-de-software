const client = require('../model/client')

module.exports = {
    async showAll(req, res) {
        return res.json(await client.find())
    }
}