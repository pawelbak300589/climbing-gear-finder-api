const express = require("express");
const router = express.Router();

const brandNameMappingService = require("../services/brand-name-mapping");

// routes
router.get("/", getAll);
router.get("/:mappingId", getById);
router.post("/", create);
router.patch("/:mappingId", update);
router.delete("/:mappingId", _delete);

module.exports = router;

function getAll(req, res, next) {
    const { brandId } = req.params;
    // TODO: send json response with all brand's name mappings
}

function getById(req, res, next) {
    const { brandId, mappingId } = req.params;
    // TODO: send json response with name mapping
}

function create(req, res, next) {
    const { brandId } = req.params;
    // TODO: send json response with created brand's name mapping
}

function update(req, res, next) {
    const { brandId, mappingId } = req.params;
    // TODO: send json response with updated brand's name mapping
}

function _delete(req, res, next) {
    const { brandId, mappingId } = req.params;
    // TODO: send json response with message?
}