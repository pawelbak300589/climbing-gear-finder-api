const express = require("express");
const { body } = require('express-validator');

const brandController = require('../controllers/brands');

const router = express.Router();

// routes
router.get("/", brandController.getAll);
router.get("/:brandId", brandController.getById);
router.post("/", [
    body('name').trim().not().isEmpty()
], brandController.create);
router.patch("/:brandId", [
    body('name').trim().not().isEmpty()
], brandController.update);
router.delete("/:brandId", brandController.delete);
router.post("/:brandId/blacklist", brandController.blacklist);
router.post("/:brandId/convert/:type/:parentId", brandController.convert);

module.exports = router;