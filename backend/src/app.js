const express = require('express')
const app = express()
const port = 8080
const catRouter = require("./routes/category");
const itemRouter = require("./routes/item");
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/lr_test1", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', function() {
    console.log("DB connected!");
})

app.use("/", catRouter);
app.use("/", itemRouter);

app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}`);
});
