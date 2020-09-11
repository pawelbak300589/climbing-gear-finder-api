const brandService = require("./brand");

const saveBrandsData = async (brands) => {
    let created = 0;
    let existed = 0;
    let blacklisted = 0;
    let messages = [];

    for (const brandData of brands) {
        await brandService.createBrand({ name: brandData.name })
            .then(result => {
                created++;
                messages.push(result.message);

                return brandService.createBrandNameMappings(result.brand);
            })
            .then(brand => {
                return brandService.createBrandImage(brand, brandData);
            })
            .then(brand => {
                return brandService.createBrandUrl(brand, brandData);
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