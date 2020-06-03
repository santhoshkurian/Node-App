const express = require("express");
const mongoose = require("mongoose");
const joi = require("joi");
const router = express.Router();

const { Item, validate } = require("../models/items");

router.get('/', async function (req, res) {
    const items = await Item.find();
    return res.send(items);
})

router.get('/:id', async function (req, res) {
    try {
        const item = await Item.findById(req.params.id);
        console.log("Item : ", item);
        return res.send(item)
    } catch (ex) {
        console.log("Error while getting document : ", ex.message);
        return res.send(ex.message)
    }
})


router.post('/', async function (req, res) {
    console.log("request :", req.body)

    const { body } = req.body;
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error); }
    let item = new Item({
        name: req.body.name,
        brandName: req.body.brandName,
        price: req.body.price,
        tags: req.body.tags
    });

    try {
        item = await item.save();
        console.log("Item : ", item);
        return res.send(item)
    } catch (ex) {
        console.log("Error while saving document : ", ex.message);
        return res.send(ex.message)
    }
})


router.put('/:id', async function (req, res) {
    console.log("request :", req.body)

    const { body } = req.body;
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error); }

    try {
        item = await Item.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            brandName: req.body.brandName,
            price: req.body.price,
            tags: req.body.tags
        });
        console.log("Item : ", item);
        return res.send(item)
    } catch (ex) {
        console.log("Error while saving document : ", ex.message);
        return res.send(ex.message)
    }
})

router.delete('/:id', async function (req, res) {
    const items = await Item.deleteOne({_id:req.params.id});
    return res.send(items);
})

module.exports = router;