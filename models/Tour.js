const mongoose = require('mongoose');


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

module.exports = Tour;