var pureCloudSession = new PureCloudSession( 'mypurecloud.com');
var usersapi = new UsersApi(pureCloudSession);

redirectUrl = "http://localhost:8080/index.html"

function loadUsers(){
    //Only gets the first page of users, increase/decrease
    // the page size or better yet use paging to get more users.
    usersapi.getUsers(25).done(function(userData){

        //set the profile pic so the template can grab it
        for(var x=0; x< userData.entities.length; x++){
            if(userData.entities[x].images){
                userData.entities[x].picture = userData.entities[x].images[0].imageUri;
            }
        }

        var source   = $("#entry-template").html();
        var template = Handlebars.compile(source);

        $("#results").html(template(userData));
    });
}

//TODO: update this call with your client id.
pureCloudSession.authorize('TODO: UPDATE CLIENT ID HERE', redirectUrl)
    .done(function() {
        loadUsers();
    });

function createUser(){

    //TODO: Update the new user's data
    var newUserData = {
       name: "",
       department: "",
       email: "",
       title: "",
       password: "",
       version: 1
   };

    usersapi.postUsers(newUserData).done(function(user){
        loadUsers();
    }).error(function(data){
        console.log("Error saving user");
        console.log(data);
    });
}

$(document).ready(function(){
    $("#createUser").click(function(){
        createUser();
    });
});
