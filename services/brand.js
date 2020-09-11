const _ = require("lodash");

const Brand = require("../models/brand");
const BrandNameMapping = require("../models/brand-name-mapping");
const BrandImage = require("../models/brand-image");
const BrandUrl = require("../models/brand-url");
const Blacklist = require("../models/blacklist");

const getAll = async () => {
    return await Brand.findAll();
};

const getById = async (id) => {
    return await getBrand(id);
};

const createBrand = async (brand) => {
    let result = {};
    // validate
    if (await Blacklist.findOne({ where: { name: brand.name, type: 'brand' } })) {
        result.message = 'Brand "' + brand.name + '" is blacklisted.';
        result.type = 'blacklisted';
        throw result;
    }
    if (await Brand.findOne({ where: { name: brand.name } }) || await BrandNameMapping.findOne({ where: { name: brand.name } })) {
        result.message = 'Brand "' + brand.name + '" already exist.';
        result.type = 'existed';
        throw result;
    }

    // save brand
    const createdBrand = await Brand.create(brand);
    result.message = 'Brand "' + brand.name + '" created.';
    result.type = 'created';
    result.brand = createdBrand;
    return result;
};

const createBrandNameMappings = async (brand) => {
    const brandNames = getBrandNameMappings(brand.name);

    // save brand name mapping
    for (const brandName of brandNames) {
        // validate
        if (!await BrandNameMapping.findOne({ where: { name: brandName, brandId: brand.id} })) {
            await brand.createBrandNameMapping({ name: brandName });
        }
    }
    return brand;
};

const createBrandImage = async (brand, brandData) => {
    await brand.createBrandImage({ src: brandData.image, alt: brand.name, main: 1 });
    return brand;
};

const createBrandUrl = async (brand, brandData) => {
    await brand.createBrandUrl({ url: brandData.url, main: 1 });
    return brand;
};

const update = async (id, params) => {
    // TODO:
};

const _delete = async (id) => {
    // TODO:
};

// helper functions
const getBrand = async (id) => {
    const brand = await Brand.findByPk(id);
    if (!brand) throw 'Brand not found';
    return brand;
};

const getBrandNameMappings = (name) => {
    return [
        name,
        _.deburr(name),
        _.capitalize(name),
        _.toUpper(name),
        _.lowerCase(name),
        _.toLower(name),
        _.camelCase(name),
        _.kebabCase(name),
        _.snakeCase(name),
        _.startCase(name),
    ];
};

module.exports = {
    getAll,
    getById,
    createBrand,
    createBrandNameMappings,
    createBrandImage,
    createBrandUrl,
    update,
    delete: _delete
};