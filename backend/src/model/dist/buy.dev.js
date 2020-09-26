"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var buySchema = new Schema({
  produto_id: {
    type: String,
    required: true
  },
  quantidade: {
    type: Number,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  data: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});
module.exports = model('buy', buySchema);