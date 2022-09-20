const express = require('express');
const cors = require('cors');
const app = express()
const mongoose = require('mongoose');
app.use(cors())
app.use(express.json())

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please assign a name."],
        trim: true,
        unique: [true, "Name should be unique"],
        minLength: [3, "Name must be 3 character"],
        maxLength: [100, "Name is too large"],
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"]
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["1person", "10persons", "20persons"],
            message: "unit value can't be {VALUE}, must be 1peron/10persons/20persons"
        }
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["available", "not-available", "discontinued"],
            message: "status can't be {VALUE}"
        }
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})


const Tour = mongoose.model('Tour', tourSchema)

app.get('/', (req, res) => {
    res.send("Hello Broooooooor");
})

app.post('/', async (req, res, next) => {
    const tour = new Tour(req.body)

    const result = await tour.save()

    res.status(200).json({
        status: "success",
        message: "Data inserted successfully",
        data: result
    })
})

module.exports = app