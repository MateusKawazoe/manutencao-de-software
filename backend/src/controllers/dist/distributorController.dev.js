"use strict";

var distributor = require('../model/distributor');

module.exports = {
  store: function store(req, res) {
    var _req$body, nome, cnpj, exists;

    return regeneratorRuntime.async(function store$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, nome = _req$body.nome, cnpj = _req$body.cnpj;
            _context.next = 3;
            return regeneratorRuntime.awrap(distributor.findOne({
              cnpj: cnpj
            }));

          case 3:
            exists = _context.sent;

            if (!exists) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.json('Distribuidor já cadastrado!'));

          case 6:
            _context.next = 8;
            return regeneratorRuntime.awrap(distributor.create({
              nome: nome,
              cnpj: cnpj
            }));

          case 8:
            return _context.abrupt("return", res.json('Distribuidor cadastrado com sucesso!'));

          case 9:
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
            return regeneratorRuntime.awrap(distributor.find());

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
  update: function update(req, res) {
    var _req$body2, nome, cnpj, auxNome, auxCnpj, exists;

    return regeneratorRuntime.async(function update$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, nome = _req$body2.nome, cnpj = _req$body2.cnpj;
            _context3.next = 3;
            return regeneratorRuntime.awrap(distributor.findOne({
              cnpj: cnpj
            }));

          case 3:
            exists = _context3.sent;

            if (exists) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.json('Distribuidor não existe!'));

          case 6:
            if (!nome) {
              auxNome = exists.nome;
            }

            if (!cnpj) {
              auxCnpj = exists.cnpj;
            }

            _context3.next = 10;
            return regeneratorRuntime.awrap(distributor.updateOne({
              cnpj: auxCnpj
            }, {
              $set: {
                nome: auxNome,
                cnpj: auxCnpj
              }
            }));

          case 10:
            return _context3.abrupt("return", res.json('Distribuidor atualizado com sucesso!'));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  "delete": function _delete(req, res) {
    var cnpj, exists;
    return regeneratorRuntime.async(function _delete$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            cnpj = req.body.cnpj;
            _context4.next = 3;
            return regeneratorRuntime.awrap(distributor.find({
              cnpj: cnpj
            }));

          case 3:
            exists = _context4.sent;

            if (exists) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.json('Distribuidor não existe!'));

          case 6:
            _context4.next = 8;
            return regeneratorRuntime.awrap(distributor.deleteOne({
              cnpj: cnpj
            }));

          case 8:
            return _context4.abrupt("return", res.json('Distribuidor excluído com sucesso!'));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    });
  }
};