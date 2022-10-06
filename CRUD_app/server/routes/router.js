// Creating all the routers in this file
const { application } = require('express')
const express = require('express')

// const app = express()  -> This will create a new app , which is not required 

//Hence Using router Method : Allows to create diff routers in a seperate file
const route = express.Router()

// Hence replacing app.get with route.get

//Separting the callback functions in a render.js
const services = require('../services/render')

//controller
const controller = require('../controller/controller');

//Multer
const multer = require('multer');

//Define storage for the image(destination)
const storage = multer.diskStorage({
    destination : (req , file , callback) => {
        callback(null , './uploads');
    } , 


    //Add extension in img
    filename : (request , file , callback) => {
        callback(null , file.fieldname + "_" + Date.now()+"_"+file.originalname)
    }
})

//Upload parameters (like a middleware)
const upload = multer({
    storage : storage
    // limits : {
    //     fileSize : 1024*1024*3  //3mb
    // }
}).single('image');    //bcoz we want to upload only single image




// route.get('/', (req , res) => {
//     // res.send("CRUD Application");

//     // Loading ejs/html file in the localhost : render()
//     res.render('index');
// })

// Replacing the above get with render file

/** 
    @Description Root Route 
    @method GET /
*/
route.get('/' , services.homeRoutes)

/** 
    @Description add Users
    @method GET /add-user
*/
route.get('/add-user' , services.add_user)

/** 
    @Description Update User 
    @method GET /update-user
*/
route.get('/update-user' , services.update_user)


// API 
route.post('/api/users' , upload , controller.create );
route.get('/api/users' , controller.find );
route.put('/api/users/:id' , controller.update );
route.delete('/api/users/:id' , controller.delete );

// route.get('/' , controller.uploadImage);
// app.post('/', upload.single('image'), (req, res, next) => {
  
//     var obj = {
//         name: req.body.name,
//         desc: req.body.desc,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     }
//     imgModel.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // item.save();
//             res.redirect('/');
//         }
//     });
// });





// Exporting Routes
module.exports = route