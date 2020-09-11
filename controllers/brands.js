const express = require("express");
const router = express.Router();

const brandService = require("../services/brand");

// routes
router.get("/", getAll);
router.get("/:brandId", getById);
router.post("/", create);
router.patch("/:brandId", update);
router.delete("/:brandId", _delete);
router.post("/:brandId/blacklist", blacklist);
router.post("/:brandId/convert/:type/:parentId", convert);

module.exports = router;

function getAll(req, res, next) {
    // TODO: send json response with all brands
}

function getById(req, res, next) {
    const { brandId } = req.params;
    // TODO: send json response with brand
}

function create(req, res, next) {
    // TODO: send json response with created brand
}

function update(req, res, next) {
    const { brandId } = req.params;
    // TODO: send json response with updated brand
}

function _delete(req, res, next) {
    const { brandId } = req.params;
    // TODO: send json response with message?
}

function blacklist(req, res, next) {
    const { brandId } = req.params;
    // TODO: add brand to blacklist
    // TODO: remove brand with all associated data (mappingNames, images, urls)
    // TODO: send json response with message/brand
}

function convert(req, res, next) {
    const { brandId, type, parentId } = req.params;
    // TODO: convert brand (mappingNames) to parent brand mapping
    // TODO: remove converted brand with all associated data (mappingNames, images, urls)
    // TODO: send json response with message/brand
}