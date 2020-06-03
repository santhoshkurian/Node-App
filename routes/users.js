const express = require("express");
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
        user = await user.save();
        console.log("User : ", user);
        return res.send(_.pick(req.body,["name","email"]));
    } catch (ex) {
        console.log("Error while saving document User: ", ex.message);
        return res.send(ex.message)
    }
})


module.exports = router;