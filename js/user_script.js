let users = [];
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users",

        success: function (data) {
            // print all users on console 
            console.log(data);
            // array of users 
            users = data;
        },
        error: function () {

            alert('Error in getting');
        }
    });



    $('.userbtn').hide()
    let data = sessionStorage.getItem('id');
    if (data === null) {
        // No user Logged in  
        console.log("No user logged in currently");
    }
    else {
        // User Logged in 
        $('.loginbtn').hide();
        $('.userbtn').show();
        $('#name').html(sessionStorage.getItem('name'));
        $('#mail1').html(sessionStorage.getItem('email'))
    }


    $('#login').click(function () {
        const email = $('#mail').val()
        const password = $('#password1').val()

        const len = users.length;
        let flag = false;
        for (let i = 0; i < len; i++) {
            if ((users[i].email == email) && (users[i].password == password)) {
                // Login successfull
                alert("Logged in Successfully");
                flag = true;
                sessionStorage.setItem('id', users[i].id);
                sessionStorage.setItem('name', users[i].name);
                sessionStorage.setItem('email', users[i].email);
                sessionStorage.setItem('mobile', users[i].mobile);
                sessionStorage.setItem('password', users[i].password);
            }
        }

        // Login failed 
        if (flag == false) {
            alert("Login failed...")
        }


    });
    // Registration 
    $("#register").click(function () {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var email = $("#email").val();
        var password = $("#password").val();
        var name = $("#name").val();
        var contact = $("#contact").val();
        // Checking for blank fields.
        if (email == '' || password == '' || name == '' || contact == '') {
            $('input[type="text"],input[type="password"]').css("border", "2px solid red");
            $('input[type="text"],input[type="password"],input[type="text"],input[type="tel"]').css("box-shadow", "0 0 3px red");
            alert("Please fill all fields...!!!!!!");
        }

        else if (contact.length <= 9) {
            $("#contact").after('<span class="error"><h6 style="color: #ff726f;"> Enter correct Mobile Number</h6></span> ').css("color", "red");

        }
        else if (!emailReg.test(email)) {
            $("#email").after('<span class="error" id="err"> <h6 style="color: #ff726f;;">Email address should be in proper format(eg:john@m.com)</h6></span>').css("color", "red");
        }

        else if (password.length <= 7) {
            $("#password").after('<span class="error"> <h6 style="color: #ff726f;;">Password length should be greater than 8 characters</h6></span>').css("color", "red");

        }

        else {
            $.post("http://localhost:3000/users", { name: name, contact: contact, email: email, password: password },
                alert("Data saved")
            );
        }
    });

    $('#reg').click(function () {
        $('#myModal').modal('show');

    });



//for tooltip of language selector

    $('[data-toggle="tooltip"]').tooltip();


//updateprofile validation

$('#submit').click(function () {

    $(".error").hide();

    var hasError = false;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var fname = /^[a-zA-Z]*$/;
    var mob = /^[1-9]{1}[0-9]{9}$/;

    var emailaddressVal = $("#url").val();
    if (emailaddressVal == '') {
        $("#url").after('<span class="error">Please enter your email address.</span>');
        $(".error").css("color", "red");
        hasError = true;

    }

    else if (!emailReg.test(emailaddressVal)) {
        $("#p2").after('<span class="error">Enter a valid email address.</span>');
        $(".error").css("color", "red");
        hasError = true;
    }


    var nameVal = $("#fullName").val();
    if (nameVal == '') {
        $("#fullName").after('<span class="error">Please enter your full name.</span>');
        $(".error").css("color", "red");
        hasError = true;
    }

    else if (!fname.test(nameVal)) {
        $("#fullName").after('<span class="error">Name should contain characters only.</span>');
        $(".error").css("color", "red");
        hasError = true;
    }

    var mobVal = $("#number").val();
    if (mobVal == '') {
        $("#number").after('<span class="error">Please enter your full name.</span>');
        $(".error").css("color", "red");
        hasError = true;
    }

    else if (!mob.test(mobVal)) {
        $("#number").after('<span class="error">Enter valid 10 digit number.</span>');
        $(".error").css("color", "red");
        hasError = true;
    }

    if (hasError == true) {
        return false;
    }
    else {
        var con = confirm("Save changes");
        if (con == true) {
            alert("Your profie information updated");
            returntrue;
        }
        else {
            return false;
        }
    }
});



// Logout function
$('#logout').click(function () {

    sessionStorage.clear();
    location.reload();
});

//changepassword validation    
$("#showErrorOld").hide();
$("#showErrorPwd").hide();
$("#showErrorcPwd").hide();

var old_err = false;
var pass_err = false;
var conpass_err = false;

$("#oldpwd").keyup(function () {
    oldpass_check();
});

function oldpass_check() {
    var oldpwd_val = $("#oldpwd").val();
    if (oldpwd_val.length == " ") {
        $("#showErrorOld").show();
        $("#showErrorOld").html("Please enter your old password");
        $("#showErrorOld").focus();
        $("#showErrorOld").css('color', 'red');
        old_err = true;
        return false;

    } else {
        $("#showErrorOld").hide();
    }
}



$("#pwd").keyup(function () {
    password_check();
});

function password_check() {
    var passwrdstr = $("#pwd").val();
    if (passwrdstr.length == " ") {
        $("#showErrorPwd").show();
        $("#showErrorPwd").html("Please enter your new password");
        $("#showErrorPwd").focus();
        $("#showErrorPwd").css('color', 'red');
        pass_err = true;
        return false;

    } else {
        $("#showErrorPwd").hide();
    }

    if ((passwrdstr.length < 8) || (passwrdstr.length > 12)) {
        $("#showErrorPwd").show();
        $("#showErrorPwd").html("password must be between 8 and 12 character");
        $("#showErrorPwd").focus();
        $("#showErrorPwd").css('color', 'red');
        pass_err = true;
        return false;

    } else {
        $("#showErrorPwd").hide();
    }

}


$("#cpwd").keyup(function () {
    conpass_check();
});

function conpass_check() {
    var conpass = $("#pwd").val();
    var passwrdstr = $("#cpwd").val();
    if (passwrdstr.length == " ") {
        $("#showErrorcPwd").show();
        $("#showErrorcPwd").html("Please enter your confirm password");
        $("#showErrorcPwd").focus();
        $("#showErrorcPwd").css('color', 'red');
        conpass_err = true;
        return false;

    } else {
        $("#showErrorcPwd").hide();
    }

    if (passwrdstr != conpass) {
        $("#showErrorcPwd").show();
        $("#showErrorcPwd").html("Password are not matching**");
        $("#showErrorcPwd").focus();
        $("#showErrorcPwd").css('color', 'red');
        conpass_err = true;
        return false;
    } else {
        $("#showErrorcPwd").hide();

    }

}

$("#changepass1").click(function () {
    var old_err = false;
    var pass_err = false;
    var conpass_err = false;

    oldpass_check();
    password_check();
    conpass_check();

    if ((old_err == false) && (pass_err == false) && (conpass_err == false)) {


        return false;
    }
    else {

        return true;

    }



});

$('#filePhoto').on('change', function () {

    // const size =
    //    (this.files[0].size / 1024).toFixed(2);

    var file_size = $('#filePHOTO')[0].files[0].size;
    if (file_size > 1024) {
        $("#output").html("File size must be less than 1mb");
        $("#output").css("color", "red");
    } else {
        $("#output").html('<b>' +
            'This file size is: ' + size + " MB" + '</b>');
    }
});


// FROM SESSIONSTORAGE PUT DATA ON FORM FILEDS 
$(this).ready(function () {
    $('#id').val(sessionStorage.getItem('id'));
    $('#fullName').val(sessionStorage.getItem('name'));
    $('#url').val(sessionStorage.getItem('email'));
    $('#mobile').val(sessionStorage.getItem('mobile'));
    $('#password').val(sessionStorage.getItem('password'));
    console.log(sessionStorage.getItem('mobile'))
});

//Edit profile functionality   

$('#submit').click(function () {
    // prepare JSON object for data updation 
    let jsonData = {
        "id": sessionStorage.getItem('id'),
        "name": $('#fullName').val(),
        "email": $('#url').val(),
        "mobile": $('#mobile').val(),
        "password": $('#password').val(),
        "pp": sessionStorage.getItem('pp')
    };
    console.log(jsonData);
    // Update the data without loading page
    $.ajax({
        async: false,
        type: "PUT",
        datatype: "json",
        url: `http://localhost:3000/users/${jsonData.id}`,
        data: jsonData,
        success: function () {

            alert("Data Modified sauccessfully");

            // Clear session storage 
            sessionStorage.clear();
            // Fill up session storeage with latest information 
            sessionStorage.setItem('id', jsonData.id);
            sessionStorage.setItem('name', jsonData.name);
            sessionStorage.setItem('email', jsonData.email);
            sessionStorage.setItem('mobile', jsonData.mobile);
            sessionStorage.setItem('password', jsonData.password);
            sessionStorage.setItem('pp', jsonData.pp);
        },
        error: function () {
            alert("Error in updating data,please try again!");
        }
    });
    document.reload();
});

//change password functionality   
$('#changepass').click(function () {
    // prepare JSON object for data updation 
    let jsonData = {
        "id": sessionStorage.getItem('id'),
        "password": $('#password').val(),
        "name": $('#fullName').val(),
        "email": $('#url').val(),
        "mobile": $('#mobile').val(),    
        "pp": sessionStorage.getItem('pp')
    };
    console.log(jsonData);
    // without loading page update the data 
    $.ajax({
        async: false,
        type: "PUT",
        datatype: "json",
        url: `http://localhost:3000/users/${jsonData.id}`,
        data: jsonData,
        success: function () {
            // modify data async
            alert("Data Modified sauccessfully");

            // clear session storage 
            sessionStorage.clear();
            // fill up session storeage with latest information 
            sessionStorage.setItem('id', jsonData.id);
            sessionStorage.setItem('password', jsonData.password);
            sessionStorage.setItem('pp', jsonData.pp);
        },
        error: function () {
            alert("Error in updating data,please try again! ");
        }
    });
    document.reload();
});
//changepassword validation

$("#showErrorOld").hide();
$("#showErrorPwd").hide();
$("#showErrorcPwd").hide();

var old_err = false;
var pass_err = false;
var conpass_err = false;

$("#oldpwd").keyup(function () {
    oldpass_check();
});

function oldpass_check() {
    var oldpwd_val = $("#oldpwd").val();
    if (oldpwd_val.length == " ") {
        $("#showErrorOld").show();
        $("#showErrorOld").html("Please enter your old password");
        $("#showErrorOld").focus();
        $("#showErrorOld").css('color', 'red');
        old_err = true;
        return false;

    } else {
        $("#showErrorOld").hide();
    }
}

$("#pwd").keyup(function () {
    password_check();
});

function password_check() {
    var passwrdstr = $("#pwd").val();
    if (passwrdstr.length == " ") {
        $("#showErrorPwd").show();
        $("#showErrorPwd").html("Please enter your new password");
        $("#showErrorPwd").focus();
        $("#showErrorPwd").css('color', 'red');
        pass_err = true;
        return false;

    } else {
        $("#showErrorPwd").hide();
    }

    if ((passwrdstr.length < 4) || (passwrdstr.length > 12)) {
        $("#showErrorPwd").show();
        $("#showErrorPwd").focus();
        $("#showErrorPwd").css('color', 'red');
        pass_err = true;
        return false;

    } else {
        $("#showErrorPwd").hide();
    }

}

$("#cpwd").keyup(function () {
    conpass_check();
});

function conpass_check() {
    var conpass = $("#pwd").val();
    var passwrdstr = $("#cpwd").val();
    if (passwrdstr.length == " ") {
        $("#showErrorcPwd").show();
        $("#showErrorcPwd").html("Please enter your confirm password");
        $("#showErrorcPwd").focus();
        $("#showErrorcPwd").css('color', 'red');
        conpass_err = true;
        return false;

    } else {
        $("#showErrorcPwd").hide();
    }

    if (passwrdstr != conpass) {
        $("#showErrorcPwd").show();
        $("#showErrorcPwd").html("Password are not matching**");
        $("#showErrorcPwd").focus();
        $("#showErrorcPwd").css('color', 'red');
        conpass_err = true;
        return false;
    } else {
        $("#showErrorcPwd").hide();

    }

}

$("#changepass").click(function () {
    var old_err = false;
    var pass_err = false;
    var conpass_err = false;

    oldpass_check();
    password_check();
    conpass_check();

    if ((old_err == false) && (pass_err == false) && (conpass_err == false)) {


        return false;
    }
    else {

        return true;

    }

});

$('#submit').click(function () {
    var oldpwd = $('#password').val();
    console.log(password);
    if (oldpwd.match(regex)) {
        $
    }
})

});




