"use strict";

var buy = require('../model/buy');

var product = require('../model/product');

module.exports = {
  store: function store(req, res) {
    var _req$body, produto_id, quantidade, valor, exists, porcentProduto, porcentCompra;

    return regeneratorRuntime.async(function store$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, produto_id = _req$body.produto_id, quantidade = _req$body.quantidade, valor = _req$body.valor;
            _context.next = 3;
            return regeneratorRuntime.awrap(product.findOne({
              _id: produto_id
            }));

          case 3:
            exists = _context.sent;

            if (exists) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(401).json('Produto não existe!'));

          case 8:
            exists.quantidade = exists.quantidade + quantidade;
            porcentProduto = exists.precoCompra / (exists.precoCompra + valor);
            porcentCompra = valor / (exists.precoCompra + valor);
            exists.precoCompra = valor * porcentCompra + exists.precoCompra * porcentProduto;

          case 12:
            _context.next = 14;
            return regeneratorRuntime.awrap(product.updateOne({
              _id: produto_id
            }, {
              $set: {
                quantidade: exists.quantidade,
                precoCompra: exists.precoCompra.toFixed(2)
              }
            }));

          case 14:
            _context.next = 16;
            return regeneratorRuntime.awrap(buy.create({
              produto_id: produto_id,
              quantidade: quantidade,
              valor: valor,
              data: new Date()
            }));

          case 16:
            return _context.abrupt("return", res.json('Compra efetuada!'));

          case 17:
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
            return regeneratorRuntime.awrap(buy.find());

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
    var _req$body2, produto_id, quantidade, valor, data, exists, aux, coef, valorCompra, valorProduto;

    return regeneratorRuntime.async(function _delete$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, produto_id = _req$body2.produto_id, quantidade = _req$body2.quantidade, valor = _req$body2.valor, data = _req$body2.data;
            _context3.next = 3;
            return regeneratorRuntime.awrap(product.findOne({
              _id: produto_id
            }));

          case 3:
            exists = _context3.sent;
            _context3.next = 6;
            return regeneratorRuntime.awrap(buy.findOne({
              produto_id: produto_id,
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

            return _context3.abrupt("return", res.status(401).json('Compra não cadastrada!'));

          case 9:
            coef = quantidade / exists.quantidade;
            valorCompra = exists.precoCompra - coef * valor;
            valorProduto = valorCompra / (1 - coef);
            _context3.next = 14;
            return regeneratorRuntime.awrap(product.updateOne({
              _id: produto_id
            }, {
              $set: {
                quantidade: exists.quantidade - quantidade,
                precoCompra: (valorProduto / 1.12).toFixed(2)
              }
            }));

          case 14:
            _context3.next = 16;
            return regeneratorRuntime.awrap(buy.deleteOne({
              _id: aux._id
            }));

          case 16:
            return _context3.abrupt("return", res.json('Compra excluída com sucesso!'));

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
};