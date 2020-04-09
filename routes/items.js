const express = require("express");
const mongoose = require("mongoose");
const joi = require("joi");
const router = express.Router();

const {Item, validate }= require("../models/items");

router.get('/', async function (req, res) {
    const items = await Item.find();
    res.send(items);
})


router.post('/', async function (req, res) {
    const { body } = req.body;
    const { error } = validate(req.body);
    if (error) { res.status(400).send(error); }
    let item = new Item({
        name: req.body.name,
        brandName: req.body.brandName,
        price: req.body.price,
        tags: req.body.tags
    });

    try {
        item = await item.save();
        console.log("Item : ", item);
        res.send(item)
    } catch (ex) {
        console.log("Error while saving document : ", ex.message);
        res.send(ex.message)
    }
})


module.exports = router;