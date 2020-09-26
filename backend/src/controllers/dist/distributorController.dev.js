"use strict";

var distributor = require('../model/distributor');

module.exports = {
  store: function store(req, res) {
    var _req$body, nome, CNPJ, exists;

    return regeneratorRuntime.async(function store$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, nome = _req$body.nome, CNPJ = _req$body.CNPJ;
            _context.next = 3;
            return regeneratorRuntime.awrap(distributor.findOne({
              CNPJ: CNPJ
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
              CNPJ: CNPJ
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
  showOne: function showOne(req, res) {
    var CNPJ, exists;
    return regeneratorRuntime.async(function showOne$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            CNPJ = req.body.CNPJ;
            _context3.next = 3;
            return regeneratorRuntime.awrap(distributor.findOne({
              CNPJ: CNPJ
            }));

          case 3:
            exists = _context3.sent;

            if (!exists) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.json(exists));

          case 8:
            return _context3.abrupt("return", res.json('Distribuidor não existe!'));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  update: function update(req, res) {
    var _req$body2, nome, CNPJ, auxNome, auxCNPJ, exists;

    return regeneratorRuntime.async(function update$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, nome = _req$body2.nome, CNPJ = _req$body2.CNPJ;
            _context4.next = 3;
            return regeneratorRuntime.awrap(distributor.findOne({
              CNPJ: CNPJ
            }));

          case 3:
            exists = _context4.sent;

            if (exists) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.json('Distribuidor não existe!'));

          case 6:
            if (!nome) {
              auxNome = exists.nome;
            }

            if (!CNPJ) {
              auxCNPJ = exists.CNPJ;
            }

            _context4.next = 10;
            return regeneratorRuntime.awrap(distributor.updateOne({
              CNPJ: auxCNPJ
            }, {
              $set: {
                nome: auxNome,
                CNPJ: auxCNPJ
              }
            }));

          case 10:
            return _context4.abrupt("return", res.json('Distribuidor atualizado com sucesso!'));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  "delete": function _delete(req, res) {
    var CNPJ, exists;
    return regeneratorRuntime.async(function _delete$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            CNPJ = req.body.CNPJ;
            _context5.next = 3;
            return regeneratorRuntime.awrap(distributor.find({
              CNPJ: CNPJ
            }));

          case 3:
            exists = _context5.sent;

            if (exists) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.json('Distribuidor não existe!'));

          case 6:
            _context5.next = 8;
            return regeneratorRuntime.awrap(distributor.deleteOne({
              CNPJ: CNPJ
            }));

          case 8:
            return _context5.abrupt("return", res.json('Distribuidor excluído com sucesso!'));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};