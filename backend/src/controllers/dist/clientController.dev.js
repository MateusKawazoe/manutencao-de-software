"use strict";

var client = require('../model/client');

module.exports = {
  showAll: function showAll(req, res) {
    return regeneratorRuntime.async(function showAll$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = res;
            _context.next = 3;
            return regeneratorRuntime.awrap(client.find());

          case 3:
            _context.t1 = _context.sent;
            return _context.abrupt("return", _context.t0.json.call(_context.t0, _context.t1));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};