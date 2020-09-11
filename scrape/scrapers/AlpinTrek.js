const axios = require("axios");
const cheerio = require("cheerio");

const scrapeBrands = () => {
    return axios("https://www.alpinetrek.co.uk/brands/")
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const manufacturers = $(".manufacturer-listitem");
            let brands = [];

            manufacturers.each((i, manufacturer) => {
                const name = $(manufacturer)
                    .find(".manufacturer > .title > a")
                    .text();
                const url = $(manufacturer)
                    .find(".manufacturer > .title > a")
                    .attr("href");
                const image = $(manufacturer).find(".img > img").attr("data-src");

                brands.push({
                    name,
                    url,
                    image,
                });
            });

            return brands;
        })
        .catch((err) => console.log(err));
};

const scrapeGears = async () => {
};

module.exports = {
    scrapeBrands,
    scrapeGears,
};
