const express = require('express')
// const productController = require('./controllers/productController')
// const userController = require('./controllers/userController')
// const distributorController = require('./controllers/distributorController')
const clientController = require('./controllers/clientController')
const routes = express.Router();

// client routes--

routes.get('/client/test', clientController.test)

// --client routes

module.exports = routes