const express = require('express')
const app = express()
const port = 8080
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

/*app.get('/api/:title/random', (req, res) => {
    const 
})
app.get('/api/:title/add', (req, res) => {
    const 
})
app.get('/api/:title/report', (req, res) => {
    const 
})*/

app.use("/", itemRouter);

app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}`);
});


/*

app.get('/api/breeds/image/random', (req, res) => {
    let retval = {"message": randdogs[Math.floor(Math.random() * randdogs.length)],
        "status":"success"}
    res.send(retval)
})
app.get('/ab*e', function(req, res) {
      res.send(req.params)
});

const Router = express.Router()
Router.get('/:breed/images/random/:digit(\\d+)', (req, res) => {
    if(Object.keys(dogs).includes(req.params.breed)) {
        let tmp = dogs[req.params.breed]
        let retdogs = []
        for(let i = 0; i < Number(req.params.digit); i++) {
            retdogs.push(tmp[Math.floor(Math.random() * tmp.length)])
            tmp = tmp.filter(ele => { return ele != retdogs[i] })
        }
        let retval = {"message": retdogs,
            "status":"success"}
        res.send(retval)
    }
    else {
        let retval = {"message": "No dogs found with breed "+req.params.breed,
            "status":"failed"}
        res.status(404).send(retval)
    }
})
app.use('/api/', Router)

app.use((req, res, next) => {
  res.status(404).send('Invalid Request');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
*/