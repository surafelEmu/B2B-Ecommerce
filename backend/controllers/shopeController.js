const Shope = require('../models/shope') ;
const catchAsyncErrors = require('../middlewares/catchAsyncErrors') ;

exports.createShope = catchAsyncErrors(async (req, res , next) => {
    
    const shope = await Shope.create(req.body) ;

    res.status(200).json({
        success: true ,
        shope
    })
}) ;

exports.getAllShopes = catchAsyncErrors(async (req , res , next) => {

    const shope = await Shope.find() ;

    res.status(200).json({
        success: true ,
        shope
    })
})