const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const joi = require("joi");

const _ = require('lodash')

const { User } = require("../models/user");

router.post('/', async function (req, res) {

    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error); }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send("Invalid Username or Password");
    }
    try {
        const isValid = await bcrypt.compare(req.body.password, user.password)
        if (!isValid) return res.status(400).send("Invalid Username or Password");
        const token = user.generateAuthToken();
        return res.send(token);
    } catch (ex) {
        console.log("login", ex.message);
        return res.send(ex.message)
    }
})

function validate(user) {
    const schema = {
        "email": joi.string().min(5).max(255).required(),
        "password": joi.string().min(5).max(15).required(),
    };
    const result = joi.validate(user, schema);
    return result;
}


module.exports = router;