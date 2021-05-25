let users = [] ;
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users",

        success: function (data) {
            // print all users on console 
            console.log(data);
            // array of users 
            users = data ;
        },
        error: function () {
            
            alert('Error in getting');
        }
    });
});


$('.userbtn').hide() 
let data = sessionStorage.getItem('id');
if (data === null) {
    // No user Logged in  
    console.log("No user logged in currently");
}
else {
    // User Logged in 
    $('.loginbtn').hide() ;
    $('.userbtn').show() ;
    $('#name').html(sessionStorage.getItem('name'));
    $('#mail1').html(sessionStorage.getItem('email'))
}


$(document).ready(function () {
    $('#login').click(function () {                
        const  email = $('#mail').val() 
        const  password = $('#password1').val() 
        
        const len = users.length  ;
        let flag = false ;
        for (let i=0 ; i<len ; i++) {
            if ((users[i].email == email)&&(users[i].password == password)){
                // Login successfull
                alert("Logged in Successfully") ;
                flag = true ; 
                sessionStorage.setItem('id', users[i].id);
                sessionStorage.setItem('name', users[i].name);
                sessionStorage.setItem('email', users[i].email);
                sessionStorage.setItem('password', users[i].password);
            }
        }

        // Login failed 
        if (flag == false ) {
            alert("Login failed...")
        }
       

    });             
}); 

$(document).ready(function () {
    // Registration 
    $("#register").click(function () {
        var emailReg= /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var email = $("#email").val();
        var password = $("#password").val();
        var name = $("#name").val();
        var contact = $("#contact").val();
        // Checking for blank fields.
        if (email == '' || password == ''||name==''||contact=='') {
            $('input[type="text"],input[type="password"]').css("border", "2px solid red");
            $('input[type="text"],input[type="password"],input[type="text"],input[type="tel"]').css("box-shadow", "0 0 3px red");
            alert("Please fill all fields...!!!!!!");
        }
        else if(!emailReg.test(email)) {
            $("#email").after('<span class="error" id="err"> <h6 style="color: red;">Email address should be in proper format(eg:john@m.com)</h6></span>').css("color","red");
        }

        else if(password.length<=7)
        {
            $("#password").after('<span class="error"> <h6 style="color: red;">Password length should be greater than 8 characters</h6></span>').css("color","red");

        }
        
        else if(contact.length<=9)
        {
            $("#contact").after('<span class="error"><h6 style="color: red;"> Enter correct Mobile Number</h6></span> ').css("color","red");

        }
         else {
            $.post("http://localhost:3000/users",{ name:name,contact:contact,email: email, password: password },
            alert("Data saved")
            );
        }
    });
});


  
// script for registratiin modal
$(document).ready(function(){
    $('#reg').click(function(){
        $('#myModal').modal('show');
    
    });
    
    });
    
    //for tooltip of language selector
    $(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip();
    });
    
    