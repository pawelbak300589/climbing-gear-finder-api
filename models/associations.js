const Website = require("./website");
const Brand = require("./brand");
const BrandNameMapping = require("./brand-name-mapping");
const BrandImage = require("./brand-image");
const BrandUrl = require("./brand-url");
const Gear = require("./gear");
const GearNameMapping = require("./gear-name-mapping");
const GearImage = require("./gear-image");
const GearUrl = require("./gear-url");
const Price = require("./price");
const Scraper = require("./scraper");

const setAssociations = () => {
    Brand.hasMany(BrandNameMapping);
    Brand.hasMany(BrandImage);
    Brand.hasMany(BrandUrl);
    BrandNameMapping.belongsTo(Brand);
    BrandImage.belongsTo(Brand);
    BrandUrl.belongsTo(Brand);
    BrandUrl.hasOne(Website);

    Gear.hasMany(GearNameMapping);
    Gear.hasMany(GearImage);
    Gear.hasMany(GearUrl);
    GearNameMapping.belongsTo(Gear);
    GearImage.belongsTo(Gear);
    GearUrl.belongsTo(Gear);
    GearUrl.hasOne(Website);

    Price.hasOne(Website);
    Price.hasOne(Gear);

    Scraper.hasOne(Website);
};
module.exports = setAssociations;