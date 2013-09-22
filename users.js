$(document).ready(function() {
    Parse.initialize("0XzvdlgqOu7EmIG56s1UHxPSNptEzTQBmDearxyQ", "ajrKgWH8DxTqOAmzcSR9WW50lD0Et9QA7tqpOWmC");
    $("#submitButtonSignUp").click(function() {

    	var userClient = {
    		username: $("#usernameSignUp").val(),
    		email: $("#emailSignUp").val(),
    		password: $("#passwordSignUp").val(),
    	}

    	console.log(userClient)

    	var user = new Parse.User();
    	user.set("username", userClient.username);
    	user.set("email", userClient.email);
    	user.set("password", userClient.password);
    	user.signUp (null, {
    		success: function(user) {
    			console.log("Success! Check the data browser.")
    			window.location.replace("/Users/alexschiff/Box Documents/Coding/favorly/index.html")
    		},
    		error: function (user, error) {
    			alert("Error: "+ error.code+ " " + error.message)
    		}

    	})

    })

    $("#submitButtonSignIn").click(function() {

    	var userClient = {
    		username: $("#usernameSignIn").val(),
    		password: $("#passwordSignIn").val()
    	}

    	console.log(userClient)

    	Parse.User.logIn(userClient.username, userClient.password, {
    		success: function(user) {
    			console.log("Success! You logged in. Going to try to redirect now!")
    			window.location.replace("/Users/alexschiff/Box Documents/Coding/favorly/index.html")
    		},
    		error: function(user, error) {

    		}
    	});

	});

});