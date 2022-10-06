//axios module allows us to make request
const axios = require('axios');

exports.homeRoutes = (req , res) => {
    
    //Make a get request to the /api/users
    axios.get('http://localhost:5000/api/users')
        .then(function(response){
            // console.log(response) -> will show n number of object properties
            // console.log(response.data) //-> will show only only 
            res.render('index' , {users : response.data});
        })
        .catch(err => {
            res.send(err);
        })

    
}

exports.add_user = (req , res) => {
    res.render('add_user');
}

exports.update_user = (req , res) => {
    //We will add data along with this 
    axios.get('http://localhost:5000/api/users' , {params:{id:req.query.id}})

    //While creating , we got all the data of the users , but this time we only want data of specific user
        .then(function(userdata){
            res.render("update_user" , {user : userdata.data})
        })
        .catch(err => {
            res.send(err);
        })

    //We want id in the url to update , but we donnot have..
    //So we will pass id to url when we click on the particular user
    // href="/update-user?id=<%= users[i]._id %> --> update this href in show.ejs
}