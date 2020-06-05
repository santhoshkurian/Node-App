const express = require("express");
const mongoose = require("mongoose");
const config = require('config');

if(!config.get("jwtPrivateKey")){
    console.log("fatal error: unable to start application");
    process.exit(1);
}

mongoose.connect("mongodb://localhost:27017/Store", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to database : Store")
    })
    .catch(err => {
        console.error("could not connect to db: Store" + err)
    });

const items = require("./routes/items");
const users = require("./routes/users");
const auth = require("./routes/auth");


const app = express();

app.use(express.json())

app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);




app.listen(3010, () => { console.log("listening port 3010") });


