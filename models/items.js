const mongoose = require("mongoose");
const joi = require("joi");

const item = mongoose.model("item", mongoose.Schema({
    name: { type: String, required: true },
    brandName: { type: String, required: true },
    price: Number,
    tags: [String],
    manufactureDate: { type: Date, default: Date.now },
}));

function validateItem(item) {
    const schema = {
        "name": joi.string().required(),
        "brandName": joi.string().required(),
        "price": joi.number(),
        "tags": joi.array().items(joi.string().required()).min(1).required()
    };
    const result = joi.validate(item, schema);
    return result;
}

exports.Item = item;
exports.validate = validateItem;
