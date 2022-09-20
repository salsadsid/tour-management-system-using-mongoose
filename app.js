const express = require('express');
const cors = require('cors');
const app = express()
const mongoose = require('mongoose');
const tourRoute = require('./routes/tour.route')
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.send("Hello Broooooooor");
})

app.use("/api/v1/tours", tourRoute)

module.exports = app