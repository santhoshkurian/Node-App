const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Store", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to database : Store")
    })
    .catch(err => {
        console.error("could not connect to db: Store" + err)
    });

const items = require("./routes/items");
const app = express();

app.use(express.json())
app.use("/api/items", items);


app.listen(3000, () => { console.log("listening port 3000") });


