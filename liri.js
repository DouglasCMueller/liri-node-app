
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
    if (!value) {
        value = "Tool";
    }
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log("-----------------")
            console.log(value + " next 5 concert dates")
            console.log("-----------------")
            for (i = 0; i < 5; i++) {

                console.log(response.data[i].venue.name);

                console.log(response.data[i].venue.city);

                var dateTime = response.data[i].datetime;
                dateTime = moment(dateTime).format("MMM Do YYYY");
                console.log(dateTime);
                console.log("-----------------")
                // var venue = response.data.venue;
                // console.log(venue)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function movieThis(value) {
    if (!value) {
        value = "jaws";
    }
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            console.log("-----------------")
            console.log("Movie Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Year);
            console.log("Imdb Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Metascore);
            console.log("Country movie produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("-----------------");
        })
        .catch(function (error) {
            console.log(error);
        });

}

