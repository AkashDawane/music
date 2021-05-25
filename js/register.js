$(document).ready(function () {
    // Registration 
    $("#register").click(function () {
        var email = $("#email").val();
        var password = $("#password").val();
        var name = $("#name").val();
        var age = $("#age").val();
        // Checking for blank fields.
        if (email == '' || password == ''||name==''||age=='') {
            $('input[type="text"],input[type="password"]').css("border", "2px solid red");
            $('input[type="text"],input[type="password"],input[type="text"],input[type="number"]').css("box-shadow", "0 0 3px red");
            alert("Please fill all fields...!!!!!!");
        } else {
            $.post("http://localhost:3000/users",{ name:name,age:age,email: email, password: password },
            alert("Data saved")
            );
        }
    });
});

