const express = require("express");
const router = express.Router();

const brandUrlService = require("../services/brand-url");

// routes
router.get("/", getAll);
router.get("/:urlId", getById);
router.post("/", create);
router.patch("/:urlId", update);
router.delete("/:urlId", _delete);
router.post("/:urlId", main);

module.exports = router;

function getAll(req, res, next) {
    const { brandId } = req.params;
    // TODO: send json response with all brand's urls
}

function getById(req, res, next) {
    const { brandId, urlId } = req.params;
    // TODO: send json response with url
}

function create(req, res, next) {
    const { brandId } = req.params;
    // TODO: send json response with created brand's url
}

function update(req, res, next) {
    const { brandId, urlId } = req.params;
    // TODO: send json response with updated brand's url
}

function _delete(req, res, next) {
    const { brandId, urlId } = req.params;
    // TODO: send json response with message?
}

function main(req, res, next) {
    const { brandId, urlId } = req.params;
    // TODO: send json response with message and brand's url?
}