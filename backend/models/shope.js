const mongoose = require('mongoose') ;

const shopeSchema = new mongoose.Schema({
    name: {
        type: String ,
        required: [true , 'Your shop should have a name']
    } ,
    description: {
        type: String ,
        required: [true , 'Say some thing about your specific shop'] 
    },
    company: {
        type: mongoose.Schema.ObjectId ,
        required: [true , 'your company?']
    }

}) ;

module.exports = mongoose.model('shope' , shopeSchema) ;