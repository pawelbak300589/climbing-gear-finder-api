const { validationResult } = require('express-validator');

const brandService = require("../services/brand");

const getAll = (req, res, next) => { // TODO: REVIEW this function (fn not tested)
    brandService.getAll(req.body)
        .then(brands => res.json(brands))
        .catch(next);
}

const getById = (req, res, next) => {
    const { brandId } = req.params;
    brandService.getById(brandId)
        .then(brand => res.json(brand))
        .catch(next);
}

const create = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = error.array();
        throw error;
    }

    brandService.create(req.body)
        .then(brand => res.status(201).json({
            message: '',
            brand
        }))
        .catch(next);
}

const update = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = error.array();
        throw error;
    }

    const { brandId } = req.params;
    brandService.update(brandId, req.body)
        .then(brand => res.json(brand))
        .catch(next);
}

const _delete = (req, res, next) => {
    const { brandId } = req.params;
    brandService.delete(brandId)
        .then(brand => res.json(brand))
        .catch(next);
}

const blacklist = (req, res, next) => {
    const { brandId } = req.params;
    brandService.blacklist(brandId)
        .then(brand => res.json(brand))
        .catch(next);
    // TODO: add brand to blacklist
    // TODO: remove brand with all associated data (mappingNames, images, urls)
    // TODO: send json response with message/brand
}

const convert = (req, res, next) => {
    const { brandId, type, parentId } = req.params;
    brandService.convert(brandId, type, parentId)
        .then(brand => res.json(brand))
        .catch(next);
    // TODO: convert brand (mappingNames) to parent brand mapping
    // TODO: remove converted brand with all associated data (mappingNames, images, urls)
    // TODO: send json response with message/brand
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    blacklist,
    convert
};