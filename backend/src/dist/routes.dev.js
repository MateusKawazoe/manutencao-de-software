"use strict";

var express = require('express');

var productController = require('./controllers/productController');

var userController = require('./controllers/userController');

var distributorController = require('./controllers/distributorController');

var clientController = require('./controllers/clientController');

var buyController = require('./controllers/buyController');

var sellController = require('./controllers/sellController');

var routes = express.Router(); // user routes--

routes.post('/user/singup', userController.singup);
routes.post('/user/singin', userController.singin);
routes.get('/user/showAll', userController.showAll); // --user routes
// client routes--

routes.post('/client/store', clientController.store);
routes.get('/client/showAll', clientController.showAll);
routes.get('/client/showOne', clientController.showOne);
routes.put('/client/update', clientController.update);
routes["delete"]('/client/delete', clientController["delete"]); // --client routes
// distributor routes--

routes.post('/distributor/store', distributorController.store);
routes.get('/distributor/showAll', distributorController.showAll);
routes.get('/distributor/showOne', distributorController.showOne);
routes.put('/distributor/update', distributorController.update);
routes["delete"]('/distributor/delete', distributorController["delete"]); // --distributor routes
// product routes--

routes.post('/product/store', productController.store);
routes.get('/product/showAll', productController.showAll);
routes.get('/product/showOne', productController.showOne);
routes.put('/product/update', productController.update);
routes["delete"]('/product/delete', productController["delete"]); // --product routes
// buy routes--

routes.post('/buy/store', buyController.store);
routes.get('/buy/showAll', buyController.showAll);
routes["delete"]('/buy/delete', buyController["delete"]); // --buy routes
// sell routes--

routes.post('/sell/store', sellController.store);
routes.get('/sell/showAll', sellController.showAll);
routes["delete"]('/sell/delete', sellController["delete"]); // --sell routes

module.exports = routes;