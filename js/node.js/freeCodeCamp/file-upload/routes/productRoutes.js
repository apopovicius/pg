const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
} = require('../controllers/productController');

const { upploadProductImage } = require('../controllers/uploadController');

router.route('/').post(createProduct).get(getAllProducts);
router.route('/uploads').post(upploadProductImage);

module.exports = router;
