"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var clientSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  CPF: {
    type: Number,
    required: true
  },
  nascimento: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});
module.exports = model('client', clientSchema);