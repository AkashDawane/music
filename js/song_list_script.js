$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: "http://localhost:3000/music",
        datatype: "json",
        async: true,
        success: function (data) {
           
           const params = new URLSearchParams(window.location.search);
           
           console.log(params)
            var artist = $.grep(data, function (element, index) {
                // console.log(element.artist)
               if (element.artist === params.get("artistName")) {
                   // if (element.artist ==="Honey Singh") {
                    console.log(element.artist)
                    $("#h1").text("Best of " + element.artist);

                    return element.artist;
                }
            })
            console.log(artist);
            var songs_data = '';
            let counter = 1;
             let id = 0;
            $.each(artist, function (key, value) {

                songs_data += `<tr >  `;
                songs_data += '<td>' + counter++ + '</td>';
                songs_data += `<td > <a class="link" href='../ui/music_player.html?id=${value.id}'>` + value.name + `</a></td>`;
                songs_data += '<td>' + value.artist + '</td>';
                songs_data += '<td>' + value.Category + '</td>';
                songs_data += '<td>' + value.language + '</td>';
                songs_data += '</tr>';
                id=value.id;
            });
            $("#tdata").append(songs_data);
            
        },
        error: function () {
            console.log("not able to procedure")
        }
    });

});













