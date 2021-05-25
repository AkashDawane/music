// script for registratiin modal
$(document).ready(function(){
  $('#reg').click(function(){
      $('#myModal').modal('show');

  });

  //for tooltip of language selector
  $('[data-toggle="tooltip"]').tooltip();


  //langauge selector

  $(".hidetable").click(function(){
    $(".tbl_bg").toggle()
  })
  

  $("#btnSubmit").click(function(){
    var selectedLanguage =""
    $('input[name="language"]:checked').each(function() {
      selectedLanguage += "langauge="+this.value+"&"
    });
    
    window.location.href="./ui/music_library.html?"+selectedLanguage.substring(0,selectedLanguage.length - 1)
  })

});



