const Company = require('../models/company')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

// Create new company   =>   /api/v1/admin/company/new
exports.newCompany = catchAsyncErrors(async (req, res, next) => {

    console.log(req.files.images) ;
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images.push(req.files.images)
    }
    console.log(images.length)

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i].tempFilePath, {
            folder: 'companys'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks
    // req.body.user = req.user.id;

    
        console.log(req.body)
        const {name , description} = req.body
        const company = await Company.create(req.body)
        res.status(201).json({
            success: true,
            company
        })
   
 
})


// Get all companys   =>   /api/v1/companys?keyword=apple
exports.getcompanys = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const companysCount = await Company.countDocuments();

    const apiFeatures = new APIFeatures(Company.find(), req.query)
        .search()
        .filter()

    let companys = await apiFeatures.query;
    let filteredcompanysCount = companys.length;

    apiFeatures.pagination(resPerPage)
    companys = await apiFeatures.query;


    res.status(200).json({
        success: true,
        companysCount,
        resPerPage,
        filteredcompanysCount,
        companys
    })

})

// Get all companys (Admin)  =>   /api/v1/admin/companys
exports.getAdminCompanys = catchAsyncErrors(async (req, res, next) => {

    const companys = await Company.find();

    res.status(200).json({
        success: true,
        companys
    })

})

// Get single company details   =>   /api/v1/company/:id
exports.getSinglecompany = catchAsyncErrors(async (req, res, next) => {

    const company = await Company.findById(req.params.id);

    if (!company) {
        return next(new ErrorHandler('company not found', 404));
    }


    res.status(200).json({
        success: true,
        company
    })

})

// Update company   =>   /api/v1/admin/company/:id
exports.updatecompany = catchAsyncErrors(async (req, res, next) => {

    let company = await Company.findById(req.params.id);

    if (!company) {
        return next(new ErrorHandler('company not found', 404));
    }

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the company
        for (let i = 0; i < company.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(company.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'companys'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }



    company = await Company.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        company
    })

})

// Delete company   =>   /api/v1/admin/company/:id
exports.deletecompany = catchAsyncErrors(async (req, res, next) => {

    const company = await Company.findById(req.params.id);

    if (!company) {
        return next(new ErrorHandler('company not found', 404));
    }

    // Deleting images associated with the company
    for (let i = 0; i < company.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(company.images[i].public_id)
    }

    await company.remove();

    res.status(200).json({
        success: true,
        message: 'company is deleted.'
    })

})

