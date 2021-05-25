$(document).ready(function () {

  // For fetching the data
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/music",
    dataType: "json",
    async: true,
    success: function (data) {
     
      // For Artists Category Starts
      var artists = [];
      for (let i = 0; i < data.length; i++) {
        artists.push(data[i].artist);
      }
      var uniqueArtists = [];
      $.each(artists, function (i, element) {
        if ($.inArray(element, uniqueArtists) === -1)
          uniqueArtists.push(element);
      });
      let counter = 1;
      let items = '';
      for (let i = 0; i < uniqueArtists.length; i++) {
        const artist = uniqueArtists[i];
        items += `
                  <div class="song">
                    <img src="../assests/images/artist${counter}.jfif" class="song-image" alt="">
                    <div class="song-info">
                      <h5><a href="./song_list.html?artistName=${artist}">${artist}</a></h5>
                    </div>
                  </div>  
          `;
        counter++;
      }

      $('.song-wrapper-5').html(items);
      // For Artists Category End
    },
    error: function () {
      console.log("Some Error occurred")
    }
  });

  // For Slider
  for (let i = 0; i <= 5; i++) {
    $(`.song-wrapper-${i}`).slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      prevArrow: $('.prev'),
      nextArrow: $('.next'),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

    // For Profile
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

  // For Search Functionality
  $("#searchkey").on("keyup", function () {
    let key = $(this).val().toLowerCase();

    $(".song").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(key) > -1);
    });
  });

});
