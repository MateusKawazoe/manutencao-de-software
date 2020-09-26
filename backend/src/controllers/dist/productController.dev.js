"use strict";

var product = require('../model/product');

var distributor = require('../model/distributor');

module.exports = {
  store: function store(req, res) {
    var _req$body, nome, fornecedor, quantidade, precoCompra, precoVenda, fornecedorExists, exists;

    return regeneratorRuntime.async(function store$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, nome = _req$body.nome, fornecedor = _req$body.fornecedor, quantidade = _req$body.quantidade, precoCompra = _req$body.precoCompra, precoVenda = _req$body.precoVenda;
            _context.next = 3;
            return regeneratorRuntime.awrap(distributor.findOne({
              CNPJ: fornecedor.CNPJ
            }));

          case 3:
            fornecedorExists = _context.sent;

            if (fornecedorExists) {
              _context.next = 7;
              break;
            }

            _context.next = 7;
            return regeneratorRuntime.awrap(distributor.create({
              nome: fornecedor.nome,
              CNPJ: fornecedor.CNPJ
            }));

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(product.findOne({
              nome: nome,
              fornecedor: fornecedor
            }));

          case 9:
            exists = _context.sent;

            if (!exists) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.json('Produto já cadastrado!'));

          case 12:
            _context.next = 14;
            return regeneratorRuntime.awrap(product.create({
              nome: nome,
              fornecedor: fornecedor,
              quantidade: quantidade,
              precoCompra: precoCompra,
              precoVenda: precoVenda
            }));

          case 14:
            return _context.abrupt("return", res.json('Produto cadastrado com sucesso!'));

          case 15:
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
            return regeneratorRuntime.awrap(product.find());

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
  showOne: function showOne(req, res) {
    var _req$body2, nome, fornecedor, exists;

    return regeneratorRuntime.async(function showOne$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, nome = _req$body2.nome, fornecedor = _req$body2.fornecedor;
            _context3.next = 3;
            return regeneratorRuntime.awrap(product.findOne({
              nome: nome,
              fornecedor: fornecedor
            }));

          case 3:
            exists = _context3.sent;

            if (!exists) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.json(exists));

          case 8:
            return _context3.abrupt("return", res.json('Produto não existe!'));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  update: function update(req, res) {
    var _req$body3, nome, novoNome, fornecedor, quantidade, precoCompra, precoVenda, auxNome, auxQuantidade, auxPrecoVenda, auxPrecoCompra, exists;

    return regeneratorRuntime.async(function update$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body3 = req.body, nome = _req$body3.nome, novoNome = _req$body3.novoNome, fornecedor = _req$body3.fornecedor, quantidade = _req$body3.quantidade, precoCompra = _req$body3.precoCompra, precoVenda = _req$body3.precoVenda;
            _context4.next = 3;
            return regeneratorRuntime.awrap(product.findOne({
              nome: nome,
              fornecedor: fornecedor
            }));

          case 3:
            exists = _context4.sent;

            if (exists) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.json('Produto não cadastrado!'));

          case 6:
            if (!novoNome) {
              auxNome = exists.nome;
            } else {
              auxNome = novoNome;
            }

            if (!quantidade) {
              auxQuantidade = exists.quantidade;
            } else {
              auxQuantidade = quantidade;
            }

            if (!precoCompra) {
              auxPrecoCompra = exists.precoCompra;
            } else {
              auxPrecoCompra = precoCompra;
            }

            if (!precoVenda) {
              auxPrecoVenda = exists.precoVenda;
            } else {
              auxPrecoVenda = precoVenda;
            }

            _context4.next = 12;
            return regeneratorRuntime.awrap(product.updateOne({
              _id: exists._id
            }, {
              $set: {
                nome: auxNome,
                quantidade: auxQuantidade,
                precoCompra: auxPrecoCompra,
                precoVenda: auxPrecoVenda
              }
            }));

          case 12:
            return _context4.abrupt("return", res.json('Produto atualizado com sucesso!'));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  "delete": function _delete(req, res) {
    var _req$body4, nome, fornecedor, exists;

    return regeneratorRuntime.async(function _delete$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body4 = req.body, nome = _req$body4.nome, fornecedor = _req$body4.fornecedor;
            _context5.next = 3;
            return regeneratorRuntime.awrap(product.findOne({
              nome: nome,
              fornecedor: fornecedor
            }));

          case 3:
            exists = _context5.sent;

            if (exists) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.json('Produto não existe!'));

          case 6:
            _context5.next = 8;
            return regeneratorRuntime.awrap(product.deleteOne({
              nome: nome,
              fornecedor: fornecedor
            }));

          case 8:
            return _context5.abrupt("return", res.json('Produto excluído com sucesso!'));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};