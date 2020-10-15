const Joi = require('joi');
const mongoose = require('mongoose');
const { categorySchema } = require('./category');

const Item = mongoose.model('Items', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255
  },
  category: {
    type: categorySchema,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  quantitycount: {
    type: Number,
    default: 0
  },
  liked: {
    type: Boolean,
    default: false
  },
}));

function validateItem(item) {
  const schema = {
    title: Joi.string().min(2).max(50).required(),
    categoryId: Joi.objectId().required(),
    price: Joi.number().min(0).required(),
    quantity: Joi.number().min(0).required()
  };

  return Joi.validate(item, schema);
}

exports.Item = Item;
exports.validate = validateItem;