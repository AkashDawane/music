$(document).ready(function (){
  
    var queryString = new Array();
    if (queryString.length == 0) {
        if (window.location.search.split('?').length > 1) {
            var params = window.location.search.split('?')[1].split('&');
            for (var i = 0; i < params.length; i++) {
                var key = params[i].split('=')[0];
                var value = decodeURIComponent(params[i].split('=')[1]);
                queryString.push(value);
            }
        }
    }
    console.log(queryString)

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/music",
        dataType: "json",
        async: true,
        success: function(data){
            
            var filteredMusic = data.filter(item => queryString.includes(item.language))      
            console.log(filteredMusic)

            //Album Categories
            // 1. Rock
            var rock = $.grep(filteredMusic, function (element , index){
                return element.Category == "rock";
            });
            var rockSongs = "";
            $.each(rock, function (key,value) {
                rockSongs += `
                <div class="song">
               
                <img src="${value.img}" class="song-image" alt="">
                    <div class="song-info">
                        <h5><a href="../ui/music_player.html?id=${value.id}">${value.name}</a></h5>
                        <p>${value.album}</p>
                    </div>
                </div>
                `;
            });
            $(".song-wrapper-2").append(rockSongs)
            



            // 2. Classical
            var classical = $.grep(filteredMusic, function (element , index){
                return element.Category == "classical";
            });
            var classicalSongs = "";
            $.each(classical, function (key,value) {
                classicalSongs += `
                <div class="song">
               
                <img src="${value.img}" class="song-image" alt="">
                    <div class="song-info">
                        <h5><a href="../ui/music_player.html?id=${value.id}">${value.name}</a></h5>
                        <p>${value.album}</p>
                    </div>
                </div>
                `;
            });
            $(".song-wrapper-3").append(classicalSongs)


            // 3. Pop
            var pop = $.grep(filteredMusic, function (element , index){
                return element.Category == "pop";
            });
            var popSongs = "";
            $.each(pop, function (key,value) {
                popSongs += `
                <div class="song">
               
                <img src="${value.img}" class="song-image" alt="">
                    <div class="song-info">
                        <h5><a href="../ui/music_player.html?id=${value.id}">${value.name}</a></h5>
                        <p>${value.album}</p>
                    </div>
                </div>
                `;
            });
            $(".song-wrapper-4").append(popSongs)


            // trending albums
            var trending = $.grep(filteredMusic, function (element , index){
                return element.popularity >= 4;
            }); 
            var trendingSongs = "";
            $.each(trending, function (key,value) {
                trendingSongs += `
                <div class="song">
               
                <img src="${value.img}" class="song-image" alt="">
                    <div class="song-info">
                        <h5><a href="../ui/music_player.html?id=${value.id}">${value.name}</a></h5>
                        <p>${value.album}</p>
                    </div>
                </div>
                `;
            });
            $(".song-wrapper-1").append(trendingSongs)
            console.log(trending);


            //Artist wise songs.
            var artist = $.grep(filteredMusic, function (element , index){
                return element.artist == "xyz";
            });

            $.each(artist, function (key,value) {
                    // $("#load-data").append(value.name + "  " + value.album + "  " + value.artist + "<br><br>")
            });


            
        },
        error: function(){
            console.log("Some Error occurred")
        }
    });

});