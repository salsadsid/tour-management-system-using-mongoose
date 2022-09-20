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
    const tour = await Tour.findOne({ _id: tourId })
    return tour
}

exports.updateATourService = async (tourId, data) => {

    const result = await Tour.updateOne({ _id: tourId }, { $set: data }, { runValidators: true })

    return result
}
