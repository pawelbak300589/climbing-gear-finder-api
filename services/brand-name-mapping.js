const _ = require("lodash");

const Brand = require("../models/brand");
const BrandNameMapping = require("../models/brand-name-mapping");

const getAll = async (brandId) => {
    return await Brand.findByPk(brandId).getBrandNameMappings();
};

const getById = async (mappingId) => {
    return await BrandNameMapping.findByPk(mappingId);
};

const create = async (brandId) => {
    const brand = await Brand.findByPk(brandId);
    const brandNames = getBrandNameMappings(brand.name);

    // save brand name mapping
    for (const brandName of brandNames) {
        // validate
        if (!await BrandNameMapping.findOne({ where: { name: brandName, brandId: brand.id } })) {
            await brand.createBrandNameMapping({ name: brandName });
        }
    }
    return brand;
};

const update = async (mappingId, params) => {
    // TODO:
};

const _delete = async (mappingId) => {
    // TODO:
};

// helper functions
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
    create,
    update,
    delete: _delete
};