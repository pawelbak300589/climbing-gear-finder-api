const express = require("express");
const router = express.Router();

const AlpinTrek = require("../scrape/scrapers/AlpinTrek");
const scrapeService = require("../services/scrape");

// routes
router.get("/:websiteName/brands", scrapeBrands);
router.get("/:websiteName/gears", scrapeGears);

module.exports = router;

function scrapeBrands(req, res, next) {
    const { websiteName } = req.params;

    switch (websiteName) {
        case "alpintrek":
            AlpinTrek.scrapeBrands()
                .then((brands) => {
                    return scrapeService.saveBrandsData(brands);
                })
                .then((result) => {
                    res.json({ website: websiteName, result });
                })
                .catch(err => console.log(err));
            break;

        default:
            next(Error("Website like this does not exist!"));
    }
}

function scrapeGears(req, res, next) {
    const { websiteName } = req.params;

    switch (websiteName) {
        case "alpintrek":
            AlpinTrek.scrapeGears()
                .then((gears) => {
                    return scrapeService.saveGearsData(gears);
                })
                .then((result) => {
                    res.json({ website: websiteName, result });
                })
                .catch(err => console.log(err));
            break;

        default:
            next(Error("Website like this does not exist!"));
    }
}
