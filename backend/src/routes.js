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

routes.post('/client/store', clientController.store)
routes.get('/client/showAll', clientController.showAll)
routes.put('/client/update', clientController.update)
routes.delete('/client/delete', clientController.delete)

// --client routes

// distributor routes--

routes.post('/distributor/store', distributorController.store)
routes.get('/distributor/showAll', distributorController.showAll)
routes.put('/distributor/update', distributorController.update)
routes.delete('/distributor/delete', distributorController.delete)

// --distributor routes

module.exports = routes