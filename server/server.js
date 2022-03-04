const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const app = express()
const {readdirSync} = require("fs");
//DB
mongoose.connect(process.env.MONGO_URI, {}).then(() => console.log("DB connected"))
    .catch((err) => console.log("DB Error => ", err));
//middleware
app.use(morgan("dev"))
app.use(bodyParser.json({limit: "5mb"}))
app.use(cors())
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.OriginalUrl}`)
    res.status(404)
    next(error)
})

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
})


//port
const port = process.env.PORT || 3001
//route middleware

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port} and ${process.env.NODE_ENV}`)
})


