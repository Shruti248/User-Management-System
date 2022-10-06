// Onclick submit of add user : alert message

//Add_user
// Form id : add_user
$("#add_user").submit(function(event){
    alert("Data Inserted Successfully.");
})

// Update 
$("#update_user").submit(function(event){
    //The default behavior of the browser is to reload when we submit the form , so we are preventing this default behavior 
    event.preventDefault(); 

    // get data from submitted form 
    var unindexed_array = $(this).serializeArray();
    //When weclick on submit , we get all the serialized data in unindexed_array variable
    // console.log(unindexed_array);  
    var data = {}

    $.map(unindexed_array,function(n , i){
        data[n['name']] = n['value'];
    })

    console.log(data);

    var request = {
        //Put request with id of the data 
        "url" : `http://localhost:5000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    //Pass the updated data
    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

//Delete Request
if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){   
        var id = $(this).attr("data-id")  //We will get current user id

        //Inside the id , making a request
        var request = {
            //delete request with id of the data 
            "url" : `http://localhost:5000/api/users/${id}`,
            "method" : "DELETE"
        }

        //user permission to delete the record 
        //confirm is the inbuilt method of the js , which will ask for permission before the delete request is executed
        if(confirm("Do you really want delete this record ? ")){
            //If yes
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();  //Reloading the browser in same root 
            })
        
        }
    })
}