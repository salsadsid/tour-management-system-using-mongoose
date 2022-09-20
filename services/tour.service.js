const Tour = require('../models/Tour')

exports.getToursService = async (filters, queries) => {
    const tours = await Tour.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
    const total = await Tour.countDocuments(filters)
    const page = Math.ceil(total / queries.limit)
    return { total, page, tours }
}
exports.createTourService = async (data) => {
    const result = await Tour.create(data)
    return result
}
exports.getATourService = async (tourId) => {
    const tour = await Tour.findByIdAndUpdate({ _id: tourId }, { $inc: { counter: 1 } }, { new: true })
    return tour
}

exports.updateATourService = async (tourId, data) => {

    const result = await Tour.updateOne({ _id: tourId }, { $set: data }, { runValidators: true })

    return result
}

exports.trendingToursService = async () => {
    const result = await Tour.find({}).sort({ counter: -1 }).limit(3)
    return result
}

exports.cheapestToursService = async () => {
    const result = await Tour.find({}).sort({ price: 1 }).limit(3)
    return result
}
