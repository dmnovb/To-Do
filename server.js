require("dotenv").config();

const express = require("express")
const app = express()
const mongoose = require("mongoose")
var cors = require('cors')
app.use(cors())

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to Database"))

app.use(express.json())

const testRouter = require("./routes/test")
const todoRouter = require("./routes/todo")
app.use("/test", testRouter)

app.use("/todo",todoRouter)

app.listen(4000, () => {
    console.log("server started")
})