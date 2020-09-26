"use strict";

var client = require('../model/client');

module.exports = {
  store: function store(req, res) {
    var _req$body, nome, CPF, nascimento, exists;

    return regeneratorRuntime.async(function store$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, nome = _req$body.nome, CPF = _req$body.CPF, nascimento = _req$body.nascimento;
            _context.next = 3;
            return regeneratorRuntime.awrap(client.findOne({
              CPF: CPF
            }));

          case 3:
            exists = _context.sent;

            if (!exists) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.json('Cliente já cadastrado!'));

          case 6:
            _context.next = 8;
            return regeneratorRuntime.awrap(client.create({
              nome: nome,
              CPF: CPF,
              nascimento: nascimento
            }));

          case 8:
            return _context.abrupt("return", res.json('Cliente cadastrado com sucesso!'));

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
            return regeneratorRuntime.awrap(client.find());

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
    var CPF, exists;
    return regeneratorRuntime.async(function showOne$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            CPF = req.body.CPF;
            _context3.next = 3;
            return regeneratorRuntime.awrap(client.findOne({
              CPF: CPF
            }));

          case 3:
            exists = _context3.sent;

            if (!exists) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.json(exists));

          case 8:
            return _context3.abrupt("return", res.json('Cliente não existe!'));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  update: function update(req, res) {
    var _req$body2, nome, CPF, nascimento, auxNome, auxCPF, auxNascimento, exists;

    return regeneratorRuntime.async(function update$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, nome = _req$body2.nome, CPF = _req$body2.CPF, nascimento = _req$body2.nascimento;
            _context4.next = 3;
            return regeneratorRuntime.awrap(client.findOne({
              CPF: CPF
            }));

          case 3:
            exists = _context4.sent;

            if (exists) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.json('Dados inválidos!'));

          case 6:
            if (!nome) {
              auxNome = exists.nome;
            } else {
              auxNome = nome;
            }

            if (!CPF) {
              auxCPF = exists.CPF;
            } else {
              auxCPF = CPF;
            }

            if (!nascimento) {
              auxNascimento = exists.nascimento;
            } else {
              auxNascimento = nascimento;
            }

            _context4.next = 11;
            return regeneratorRuntime.awrap(client.updateOne({
              CPF: auxCPF
            }, {
              $set: {
                nome: auxNome,
                CPF: auxCPF,
                nascimento: auxNascimento
              }
            }));

          case 11:
            return _context4.abrupt("return", res.json('Cliente atualizado com sucesso!'));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  "delete": function _delete(req, res) {
    var CPF, exists;
    return regeneratorRuntime.async(function _delete$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            CPF = req.body.CPF;
            _context5.next = 3;
            return regeneratorRuntime.awrap(client.find({
              CPF: CPF
            }));

          case 3:
            exists = _context5.sent;

            if (exists) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.json('Cliente não existe!'));

          case 6:
            _context5.next = 8;
            return regeneratorRuntime.awrap(client.deleteOne({
              CPF: CPF
            }));

          case 8:
            return _context5.abrupt("return", res.json('Cliente excluído com sucesso!'));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};