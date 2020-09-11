const Brand = require("../models/brand");
const BrandImage = require("../models/brand-image");

const getAll = async (brandId) => {
    return await Brand.findByPk(brandId).getBrandImages();
};

const getById = async (imageId) => {
    return await BrandImage.findByPk(imageId);
};

const create = async (brandId, params) => {
    const brand = await Brand.findByPk(brandId);
    await brand.createBrandImage({ src: params.image, alt: brand.name, main: 1 });
    return brand;
};

const update = async (imageId, params) => {
    // TODO:
};

const _delete = async (imageId) => {
    // TODO:
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};