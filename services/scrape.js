const brandService = require("./brand");
const brandNameMappingService = require("./brand-name-mapping");
const brandImageService = require("./brand-image");
const brandUrlService = require("./brand-url");

const saveBrandsData = async (brands) => {
    let created = 0;
    let existed = 0;
    let blacklisted = 0;
    let messages = [];

    for (const brandData of brands) {
        await brandService.create({ name: brandData.name })
            .then(result => {
                created++;
                messages.push(result.message);

                return brandNameMappingService.create(result.brand.id);
            })
            .then(brand => {
                return brandImageService.create(brand.id, brandData);
            })
            .then(brand => {
                return brandUrlService.create(brand.id, brandData);
            })
            .catch(err => {
                if (err.type === 'existed') existed++;
                if (err.type === 'blacklisted') blacklisted++;
                messages.push(err.message);
            });
    }

    return { created, existed, blacklisted, messages };
};

const saveGearsData = async (gears) => {
    // TODO:
    return gears;
};

module.exports = {
    saveBrandsData,
    saveGearsData
};