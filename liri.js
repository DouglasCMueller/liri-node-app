
require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api'); //Using the Spotify api and getting the key from keys.js
var spotify = new Spotify(keys.spotify);

var moment = require('moment'); //Both required to use moment for node
moment().format();

var axios = require('axios'); //To get the information from the APIs for movie and concert-this

var fs = require('fs'); //To read the random.txt file for the do-what-it-says function

var command = process.argv[2]; //For the switch statement
var value = process.argv[3]; //To send the song/movie/concert to their respective functions

switch (command) {
    case "concert-this":
        concertThis(value);
        break;
    case "spotify-this-song":
        spotifySong(value);
        break;
    case "movie-this":
        movieThis(value);
        break;
    case "do-what-it-says":
        doThis(value);
        break;
};
function concertThis(value) {
    if(!value){
        value="U2";
    }
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {
console.log(response.venue);


        // var venue = response.data.venue;
        // console.log(venue)
           
    })
    .catch(function (error) {
        console.log(error);
    });
}

function movieThis(value) {
    if(!value){
        value = "jaws";
    }
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
        var movieTitle = response.data.Title;
        console.log(movieTitle)
           
    })
    .catch(function (error) {
        console.log(error);
    });
    
}

