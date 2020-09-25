"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var productSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  fornecedor: {},
  quantidade: {
    type: Number,
    required: true
  },
  precoCompra: {
    type: Number,
    required: true
  },
  precoVenda: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
module.exports = model('product', productSchema);