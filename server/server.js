const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const app = express()
const { readdirSync } = require("fs");
//DB
mongoose.connect(process.env.MONGO_URI, {}).then(() => console.log("DB connected"))
    .catch((err) => console.log("DB Error => ", err));
//middleware
app.use(morgan("dev"))
app.use(bodyParser.json({limit: "3mb"}))
app.use(cors())

//port
const port = process.env.PORT || 3001
//route middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port} and ${process.env.NODE_ENV}`)
})


