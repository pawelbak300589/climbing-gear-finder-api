const Brand = require("../models/brand");
const BrandNameMapping = require("../models/brand-name-mapping");
const BrandImage = require("../models/brand-image");
const BrandUrl = require("../models/brand-url");
const Blacklist = require("../models/blacklist");

const getAll = async () => {
    return await Brand.findAll();
};

const getById = async (brandId) => {
    return await getBrand(brandId);
};

const create = async ({ name }) => {
    let result = {};
    // validate
    if (await Blacklist.findOne({ where: { name: name, type: 'brand' } })) {
        result.message = 'Brand "' + name + '" is blacklisted.';
        result.type = 'blacklisted';
        throw result;
    }
    if (await Brand.findOne({ where: { name: name } }) || await BrandNameMapping.findOne({ where: { name: name } })) {
        result.message = 'Brand "' + name + '" already exist.';
        result.type = 'existed';
        throw result;
    }

    // save brand
    const createdBrand = await Brand.create({ name });
    result.message = 'Brand "' + name + '" created.';
    result.type = 'created';
    result.brand = createdBrand;
    return result;
};

const update = async (brandId, params) => {
    // TODO:
};

const _delete = async (brandId) => {
    // TODO:
};

// helper functions
const getBrand = async (brandId) => {
    const brand = await Brand.findByPk(brandId);
    if (!brand) throw 'Brand not found';
    return brand;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};