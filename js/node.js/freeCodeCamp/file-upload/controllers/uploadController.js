const { StatusCodes } = require('http-status-codes');
const path = require('path');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadProductImageLocal = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError('No file Uploaded');
    }

    if (!req.minetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please upload image');
    }

    const maxSize = 1024 * 1024; //1MB
    if (!req.size > maxSize) {
        throw new CustomError.BadRequestError(
            `Please upload  lower than ${maxSize}MB`
        );
    }

    const productImage = req.files.image;
    const imagePath = path.join(
        __dirname,
        '../public/uploads/' + `${productImage.name}`
    );

    await productImage.mv(imagePath);
    res.status(StatusCodes.OK).json({
        image: { src: `/uploads/${productImage.name}` },
    });
};

const uploadProductImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        { use_filename: true, folder: 'file-upload' }
    );
    console.log(result);
    fs.unlinkSync(req.files.image.tempFilePath);
    res.status(StatusCodes.OK).json({
        image: { src: result.secure_url },
    });
};
module.exports = { uploadProductImage };
