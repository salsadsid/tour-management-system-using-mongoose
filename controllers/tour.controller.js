
const Tour = require('../models/Tour')
const { createTourService, getToursService, getATourService, updateATourService } = require('../services/tour.service')


exports.getTours = async (req, res, next) => {
    try {

        let filters = { ...req.query }
        const excludedFields = ['sort', 'page', 'limit', 'fields']
        excludedFields.forEach(field => delete filters[field])

        let filterString = JSON.stringify(filters)
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        filters = JSON.parse(filterString)
        console.log(filters);
        const queries = {}

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')

            queries.sortBy = sortBy
            // console.log(queries)
        }
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            // console.log(fields)
            queries.fields = fields
            // console.log(fields)
        }
        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;

            const skip = (page - 1) * Number(limit);

            queries.skip = skip;
            queries.limit = Number(limit)
        }
        const tours = await getToursService(filters, queries)
        res.status(200).json({
            status: "success",
            data: tours
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get the data",
            error: error.message
        })
    }
}

exports.createTour = async (req, res, next) => {
    try {
        const result = await createTourService(req.body)
        res.status(200).json({
            status: 'success',
            message: "Data inserted Successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: 'Data in not inserted',
            error: error.message
        })
    }
}

exports.getATour = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await getATourService(id)
        res.status(200).json({
            status: 'success',
            message: "Data inserted Successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: 'Data in not inserted',
            error: error.message
        })
    }
}
exports.updateATour = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateATourService(id, req.body);
        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't update the data",
            error: error.message
        })
    }
}