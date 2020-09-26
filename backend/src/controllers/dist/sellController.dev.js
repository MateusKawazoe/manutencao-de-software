"use strict";

var sell = require('../model/sell');

var product = require('../model/product');

var client = require('../model/client');

module.exports = {
  store: function store(req, res) {
    var _req$body, produto_id, CPF, quantidade, valor, exists, clientExists;

    return regeneratorRuntime.async(function store$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, produto_id = _req$body.produto_id, CPF = _req$body.CPF, quantidade = _req$body.quantidade, valor = _req$body.valor;
            _context.next = 3;
            return regeneratorRuntime.awrap(product.findOne({
              _id: produto_id
            }));

          case 3:
            exists = _context.sent;
            _context.next = 6;
            return regeneratorRuntime.awrap(client.findOne({
              CPF: CPF
            }));

          case 6:
            clientExists = _context.sent;

            if (!(exists.quantidade < quantidade)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.json('Não existe a quantidade suficiente do produto!'));

          case 9:
            if (clientExists) {
              _context.next = 13;
              break;
            }

            _context.next = 12;
            return regeneratorRuntime.awrap(client.create(cliente));

          case 12:
            clientExists = _context.sent;

          case 13:
            if (exists) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", res.status(401).json('Produto não existe!'));

          case 17:
            exists.quantidade = exists.quantidade - quantidade;
            exists.precoVenda = (quantidade * valor + exists.quantidade * exists.precoVenda) / (quantidade + exists.quantidade);

          case 19:
            _context.next = 21;
            return regeneratorRuntime.awrap(product.updateOne({
              _id: produto_id
            }, {
              $set: {
                quantidade: exists.quantidade,
                precoVenda: exists.precoVenda.toFixed(2)
              }
            }));

          case 21:
            _context.next = 23;
            return regeneratorRuntime.awrap(sell.create({
              produto_id: produto_id,
              cliente: clientExists._id,
              quantidade: quantidade,
              valor: valor,
              data: new Date()
            }));

          case 23:
            return _context.abrupt("return", res.json('Venda efetuada!'));

          case 24:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  showAll: function showAll(req, res) {
    return regeneratorRuntime.async(function showAll$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = res;
            _context2.next = 3;
            return regeneratorRuntime.awrap(sell.find());

          case 3:
            _context2.t1 = _context2.sent;
            return _context2.abrupt("return", _context2.t0.json.call(_context2.t0, _context2.t1));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  "delete": function _delete(req, res) {
    var _req$body2, produto_id, cliente, quantidade, valor, data, exists, aux, valorVenda;

    return regeneratorRuntime.async(function _delete$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, produto_id = _req$body2.produto_id, cliente = _req$body2.cliente, quantidade = _req$body2.quantidade, valor = _req$body2.valor, data = _req$body2.data;
            _context3.next = 3;
            return regeneratorRuntime.awrap(product.findOne({
              _id: produto_id
            }));

          case 3:
            exists = _context3.sent;
            _context3.next = 6;
            return regeneratorRuntime.awrap(sell.findOne({
              produto_id: produto_id,
              cliente: cliente,
              quantidade: quantidade,
              valor: valor,
              data: data
            }));

          case 6:
            aux = _context3.sent;

            if (aux) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(401).json('Venda não cadastrada!'));

          case 9:
            valorVenda = ((exists.quantidade + quantidade) * exists.precoVenda - quantidade * valor) / exists.quantidade;
            _context3.next = 12;
            return regeneratorRuntime.awrap(product.updateOne({
              _id: produto_id
            }, {
              $set: {
                quantidade: exists.quantidade + quantidade,
                precoVenda: valorVenda.toFixed(2)
              }
            }));

          case 12:
            _context3.next = 14;
            return regeneratorRuntime.awrap(sell.deleteOne({
              _id: aux._id
            }));

          case 14:
            return _context3.abrupt("return", res.json('Venda excluída com sucesso!'));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
};