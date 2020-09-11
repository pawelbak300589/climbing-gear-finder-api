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
    const scraperData = await prepareScraperData().collectionUrls;
    let gears = [];

    console.log(scraperData);

    // for (const pageUrl of scraperData.collectionUrls) {
    //     console.log(pageUrl);
    // }

    // const products = $("ul#product-list");
    //
    // products.each((i, product) => {
    //     // const brand = $(product)
    //     //     .find("li.product-item > a.product-link > div.product-infobox > div.manufacturer-title")
    //     //     .text();
    //
    //     console.log($(product).find("li.product-item > a.product-link > div.product-infobox > div.manufacturer-title").text());
    //
    //     // const name = $(product)
    //     //     .find("li.product-item > a.product-link > div.product-infobox > div.product-title")
    //     //     .text();
    //     // const url = $(product)
    //     //     .find("li.product-item > a.product-link")
    //     //     .attr("href");
    //     // const image = $(product)
    //     //     .find("li.product-item > a.product-link > img.product-image")
    //     //     .attr("data-src");
    //
    //     // console.log(brand);
    //
    //     // gears.push({
    //     //     brand,
    //     //     name,
    //     //     url,
    //     //     image,
    //     // });
    // });
    //
    // console.log(gears);

    // return gears;
};

const prepareScraperData = async () => {
    let scraperData = [];

    for (const [collectionIndex, mainUrl] of getCollections().entries()) {
        const pagesNumber = await getPagesNumber(mainUrl);
        let collectionUrls = [];

        for (let page = 1; page <= pagesNumber; page++) {
            collectionUrls.push(`${mainUrl}/${page}`);
        }

        scraperData[collectionIndex] = {
            mainUrl,
            pagesNumber,
            collectionUrls,
        };
    }

    return scraperData;
};

const getCollections = () => {
    return [
        'https://www.alpinetrek.co.uk/climbing-shoes',
        // 'https://www.alpinetrek.co.uk/carabiners-quickdraws',
        // 'https://www.alpinetrek.co.uk/climbing-harnesses',
        // 'https://www.alpinetrek.co.uk/climbing-ropes',
        // 'https://www.alpinetrek.co.uk/climbing-boulder-accessories',
        // 'https://www.alpinetrek.co.uk/slings-cord',
        // 'https://www.alpinetrek.co.uk/belay-devices-descenders',
        // 'https://www.alpinetrek.co.uk/climbing-helmets',
        // 'https://www.alpinetrek.co.uk/climbing-bouldering-training',
        // 'https://www.alpinetrek.co.uk/mountaineering-ice-climbing',
        // 'https://www.alpinetrek.co.uk/bigwall-trad-climbing',
        // 'https://www.alpinetrek.co.uk/via-ferrata-gear',
        // 'https://www.alpinetrek.co.uk/crash-pads',
        // 'https://www.alpinetrek.co.uk/climbing-sets',
        // 'https://www.alpinetrek.co.uk/slacklining',
    ];
};

const getPagesNumber = (collectionUrl) => {
    return axios(collectionUrl)
        .then((response) => {
            const $ = cheerio.load(response.data);
            const pagination = $("div.paging");
            let page = 1;

            pagination.each((i, pag) => {
                page = $(pag).find("div.paging a.locator-item:last-child").text();
            });
            return page;
        })
        .catch((err) => console.log(err));
};

module.exports = {
    scrapeBrands,
    scrapeGears,
};
