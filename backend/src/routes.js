const express = require('express')
const productController = require('./controllers/productController')
const userController = require('./controllers/userController')
const distributorController = require('./controllers/distributorController')
const clientController = require('./controllers/clientController')
const buyController = require('./controllers/buyController')
const sellController = require('./controllers/sellController')
const routes = express.Router();

// user routes--

routes.post('/user/signup', userController.signup)
routes.post('/user/signin', userController.signin)
routes.get('/user/showAll', userController.showAll)
routes.delete('/user/delete', userController.delete)

// --user routes

// client routes--

routes.post('/client/store', clientController.store)
routes.get('/client/showAll', clientController.showAll)
routes.post('/client/showOne', clientController.showOne)
routes.post('/client/showOneById', clientController.showOneById)
routes.post('/client/showOneByName', productController.showOneByName)
routes.put('/client/update', clientController.update)
routes.post('/client/delete', clientController.delete)

// --client routes

// distributor routes--

routes.post('/distributor/store', distributorController.store)
routes.get('/distributor/showAll', distributorController.showAll)
routes.post('/distributor/showOne', distributorController.showOne)
routes.put('/distributor/update', distributorController.update)
routes.post('/distributor/delete', distributorController.delete)

// --distributor routes

// product routes--

routes.post('/product/store', productController.store)
routes.get('/product/showAll', productController.showAll)
routes.post('/product/showOne', productController.showOne)
routes.post('/product/showByDistributor', productController.showByDistributor)
routes.post('/product/showOneByName', productController.showOneByName)
routes.post('/product/showById', productController.showById)
routes.put('/product/update', productController.update)
routes.post('/product/delete', productController.delete)

// --product routes

// buy routes--

routes.post('/buy/store', buyController.store)
routes.get('/buy/showAll', buyController.showAll)
routes.post('/buy/showOne', buyController.showOne)
routes.post('/buy/delete', buyController.delete)

// --buy routes

// sell routes--

routes.post('/sell/store', sellController.store)
routes.get('/sell/showAll', sellController.showAll)
routes.post('/sell/showOne', sellController.showOne)
routes.post('/sell/delete', sellController.delete)

// --sell routes

module.exports = routes