$(document).ready(function () {
    var queryString = new Array();
    if (queryString.length == 0) {
        if (window.location.search.split('?').length > 1) {
            var params = window.location.search.split('?')[1].split('&');
            for (var i = 0; i < params.length; i++) {
                var key = params[i].split('=')[0];
                var value = decodeURIComponent(params[i].split('=')[1]);
                queryString[key] = value;
            }
        }
    }
    $(function () {
        if (queryString["id"] != null ) {
           
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/music/" + queryString["id"],
                dataType: "json",
                async: true,
                success: function(data){
                    console.log(data)
                    $(".img-area").html(`<img src="${data.img}" alt="">`)
                    $(".song-details").html(`
                        <h3 class="name">${data.name}</h3>
                        <p class="album">${data.album}</p>
                    `)
                    $(".audio-panel").html(`
                    <audio autoplay controls src="${data.path}"></audio>
                    `)

                },
                error: function(){
                    console.log("Some Error occurred")
                }
            })
                     
            
        }
        var id = queryString["id"]
        $('#btn-prev').click(function (){
            id = parseInt(id)-1;
            if(id < 1){
                id = 9;
                window.location.replace("../ui/music_player.html?id="+id)
            }else{
                window.location.replace("../ui/music_player.html?id="+id)
            }
        })

        $('#btn-next').click(function (){
            id = parseInt(id)+1;
            if(id > 9){
                id = 1;
                window.location.replace("../ui/music_player.html?id="+id)
            }else{
                window.location.replace("../ui/music_player.html?id="+id)
            }
            
        })
    });

});