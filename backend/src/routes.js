const express = require('express')
// const productController = require('./controllers/productController')
const userController = require('./controllers/userController')
const distributorController = require('./controllers/distributorController')
const clientController = require('./controllers/clientController')
const routes = express.Router();

// user routes--

routes.post('/user/singup', userController.singup)
routes.post('/user/singin', userController.singin)

// --user routes

// client routes--

routes.get('/client/showAll', clientController.showAll)

// --client routes

// distributor routes--

routes.get('/distributor/showAll', distributorController.showAll)

// --distributor routes

module.exports = routes