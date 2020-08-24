const express = require("express");
const router = express.Router();
const authorize = require("../_middleware/authorize");
const AlpinTrek = require("./scrapers/AlpinTrek");

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
                    res.json({ message: "test", brands, website: websiteName });
                })
                .catch();
            break;

        default:
            next(Error("Website like this does not exist!"));
    }
}
function scrapeGears(req, res, next) {}
