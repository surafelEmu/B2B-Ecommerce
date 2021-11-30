const mongoose = require('mongoose')
const validator = require('validator')


const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter company name'],
        //trim: true,
        //maxLength: [100, 'company name cannot exceed 100 characters']
    } ,
    description: {
        type: String,
        required: [true, 'Please enter company description'],
    },
    address: [ 
        {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            phoneNo: {
                type: String,
                required: true
            },
            postalCode: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
           
        }
       
    ] ,
    email: {
        type: String ,
        required: [true , 'Please provide an email address'] ,
        unique: true ,
        validator: [validator.isEmail, 'Please enter a valid email address']
    } ,
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ] ,
    // users: [
    //     {
    //             type: mongoose.Schema.ObjectId,
    //             ref: 'User',
    //             required: true
            
    //     }
       
    // ] ,
//     partners: [
//         {
//             name: {
//                 type: String ,
//                 required: true  ,
//                 maxLength: [50, 'companies name can not exceed 50 charactors']
//             } ,
//             description: {
//                 type: String ,
//                 required: true ,
//                 maxLength: [200 , 'parteners description can not be more than 200 charactors']
//             } ,
//             images: [
//                 {
//                     public_id: {
//                         type: String,
//                         required: true
//                     },
//                     url: {
//                         type: String,
//                         required: true
//                     },
//                 }
//             ] ,  
//         } 
        
//     ],
//     management: [ 
//         {
//             name: {
//                 type: String ,
//                 required: true ,
//                 maxLength: [20 , 'a name can not exceed 20 charactors'] ,

//             } ,
//             position: {
//                 type: String ,
//                 required: true ,
//                 maxLength: [30 , 'position can not exceed 30 charactors']
//             } ,
//             images: 
//                 {
//                     public_id: {
//                         type: String,
//                         required: true
//                     },
//                     url: {
//                         type: String,
//                         required: true
//                     },
//                 }
//             ,
//         }
//      ] ,
//     team: 
//         [ 
//             {
//                 name: {
//                     type: String ,
//                     required: true ,
//                     maxLength: [20 , 'a name can not exceed 20 charactors'] ,
    
//                 } ,
//                 position: {
//                     type: String ,
//                     required: true ,
//                     maxLength: [30 , 'position can not exceed 30 charactors']
//                 } ,
//                 images: 
//                     {
//                         public_id: {
//                             type: String,
//                             required: true
//                         },
//                         url: {
//                             type: String,
//                             required: true
//                         },
//                     }
//                 ,
//             }
//          ] ,
//          totalEmployees: {
//             type: Number 
//          } ,
//          foundedAt: {
//             type: Date ,
//             required: true 
//          } ,
//          companySertificates: [
//              { 

//             name: {
//                 type: String ,
//                 required: true ,
//                 maxLength: [20 , 'a name can not exceed 20 charactors'] ,

//             } ,
//             description: {
//                 type: String ,
//                 required: true ,
//                 maxLength: [30 , 'position can not exceed 30 charactors']
//             } ,
//             images: 
//                 {
//                     public_id: {
//                         type: String,
//                         required: true
//                     },
//                     url: {
//                         type: String,
//                         required: true
//                     },
//                 }
// }
//          ],
            
          
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('company', companySchema);