const express = require("express");
const router = express.Router();

const brandImageService = require("../services/brand-image");

// routes
router.get("/", getAll);
router.get("/:imageId", getById);
router.post("/", create);
router.patch("/:imageId", update);
router.delete("/:imageId", _delete);
router.post("/:imageId", main);

module.exports = router;

function getAll(req, res, next) {
    const { brandId } = req.params;
    // TODO: send json response with all brand's images
}

function getById(req, res, next) {
    const { brandId, imageId } = req.params;
    // TODO: send json response with image
}

function create(req, res, next) {
    const { brandId } = req.params;
    // TODO: send json response with created brand's image
}

function update(req, res, next) {
    const { brandId, imageId } = req.params;
    // TODO: send json response with updated brand's image
}

function _delete(req, res, next) {
    const { brandId, imageId } = req.params;
    // TODO: send json response with message?
}

function main(req, res, next) {
    const { brandId, imageId } = req.params;
    // TODO: send json response with message and brand's image?
}