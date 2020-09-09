require('dotenv').config();

const express = require('express');
const cors = require('cors');

const errorHandler = require('./middleware/error-handler');
const sequelize = require('./utils/database');

const Website = require("./models/website");
const Brand = require("./models/brand");
const BrandNameMapping = require("./models/brand-name-mapping");
const BrandImage = require("./models/brand-image");
const BrandUrl = require("./models/brand-url");
const Gear = require("./models/gear");
const GearNameMapping = require("./models/gear-name-mapping");
const GearImage = require("./models/gear-image");
const GearUrl = require("./models/gear-url");
const Price = require("./models/price");
const Scraper = require("./models/scraper");

const app = express();

app.use(express.json());
app.use(cors());

// api routes
// app.use('/auth', require('./controllers/auth'));

// global error handler
app.use(errorHandler);

// tables relations
Brand.hasMany(BrandNameMapping);
Brand.hasMany(BrandImage);
Brand.hasMany(BrandUrl);
BrandNameMapping.hasOne(Brand);
BrandImage.hasOne(Brand);
BrandUrl.hasOne(Brand);
BrandUrl.hasOne(Website);

Gear.hasMany(GearNameMapping);
Gear.hasMany(GearImage);
Gear.hasMany(GearUrl);
GearNameMapping.hasOne(Gear);
GearImage.hasOne(Gear);
GearUrl.hasOne(Gear);
GearUrl.hasOne(Website);

Price.hasOne(Website);
Price.hasOne(Gear);

Scraper.hasOne(Website);

// start server
sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
        app.listen(port, () => {
            console.log('Server running on port ' + port);
        });
    })
    .catch(err => console.log(err));