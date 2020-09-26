"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var sellSchema = new Schema({
  produto_id: {
    type: String,
    required: true
  },
  cliente: {
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
module.exports = model('sell', sellSchema);