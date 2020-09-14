const { Op } = require("sequelize");

const Brand = require("../models/brand");
const BrandNameMapping = require("../models/brand-name-mapping");
const BrandImage = require("../models/brand-image");
const BrandUrl = require("../models/brand-url");
const Blacklist = require("../models/blacklist");

const getAll = async (body) => { // TODO: REVIEW this function (fn not tested)
    const { page, per_page, search_phrase, search_exact } = body;
    const condition = search_phrase ? { name: { [Op.like]: (search_exact ? `${search_phrase}` : `%${search_phrase}%`) } } : null;
    return await Brand.findAndCountAll({
        limit: per_page,
        offset: page * per_page,
        where: condition,
    });
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

const update = async (brandId, { name }) => {
    const brand = await Brand.findOne({ where: { name: name } });
    if (!brand) {
        throw new Error("Brand doesn't exist!");
    }

    // validate
    if (!name) { // TODO: add middleware validator
        throw new Error(`Brand name is mandatory.`);
    }
    if (await Brand.findOne({ where: { name: name } }) || await BrandNameMapping.findOne({ where: { name: name } })) {
        throw new Error(`Brand with name "${name}" already exist.`);
    }
    if (await Blacklist.findOne({ where: { name: name, type: 'brand' } })) {
        throw new Error(`Brand with name "${name}" is blacklisted.`);
    }

    // update brand
    const updatedBrand = await Brand.update({ name });
    return updatedBrand;
};

const _delete = async (brandId) => {
    // TODO:
};

const blacklist = async (brandId) => {
    // TODO:
};

const convert = async (brandId, type, parentId) => {
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
    delete: _delete,
    blacklist,
    convert
};