const Brand = require("../models/brand");
const BrandUrl = require("../models/brand-url");

const getAll = async (brandId) => {
    return await Brand.findByPk(brandId).getBrandUrls();
};

const getById = async (urlId) => {
    return await BrandUrl.findByPk(urlId);
};

const create = async (brandId, params) => {
    const brand = await Brand.findByPk(brandId);
    await brand.createBrandUrl({ url: params.url, main: 1 });
    return brand;
};

const update = async (urlId, params) => {
    // TODO:
};

const _delete = async (urlId) => {
    // TODO:
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};