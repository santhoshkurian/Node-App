const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const _ = require('lodash')

const {User, validate }= require("../models/user");

router.post('/', async function (req, res) {

    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error); }
    let user = await User.findOne({email:req.body.email});
    if(user) {
        return res.status(400).send("User already exist");
    }
    user = new User(_.pick(req.body,["name","email","password"]));
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt)
        user = await user.save();
        console.log("User : ", user);
        const token = user.generateAuthToken();
        return res.header("x-auth-token",token).send(_.pick(req.body,["name","email"]));
    } catch (ex) {
        console.log("Error while saving document User: ", ex.message);
        return res.send(ex.message)
    }
})


module.exports = router;