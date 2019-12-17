
require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api'); //Using the Spotify api and getting the key from keys.js
var spotify = new Spotify(keys.spotify);

var moment = require('moment'); //Both required to use moment for node
moment().format();

var axios = require('axios'); //To get the information from the APIs for movie and concert-this

var fs = require('fs'); //To read the random.txt file for the do-what-it-says function
//store user command and (concert artist/movie/song)
var totalCommand = process.argv;

var userCommand = process.argv[2];

var userEnteredData = "";
for (var i = 3; i < totalCommand.length; i++) {
    if (i > 3 && i < totalCommand.length) {
      userEnteredData = userEnteredData + "+" + totalCommand[i];
    } else {
      userEnteredData += totalCommand[i];
     }
  }
 
//determine user command
switch (userCommand) {
    case "concert-this":
        concertThis(userEnteredData);
        break;
    case "spotify-this-song":
        spotifySong(userEnteredData);
        break;
    case "movie-this":
        movieThis(userEnteredData);
        break;
    case "do-what-it-says":
        doThis(userEnteredData);
        break;
};
//define function for logging next 5 concerts from artist entered by user
function concertThis(userEnteredData) {
    if (!userEnteredData) {
        userEnteredData = "The Marshall Tucker Band";
    }
    axios.get("https://rest.bandsintown.com/artists/" + userEnteredData + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log("-----------------")
            console.log(userEnteredData + " next 5 concert dates")
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
//define function for logging data from movie entered by user
function movieThis(userEntered) {
    if (!userEntered) {
        userEntered = "jaws";
    }
    axios.get("https://www.omdbapi.com/?t=" + userEntered + "&y=&plot=short&apikey=trilogy")
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
//define function for logging data about song entered by user
function spotifySong(userEntered) {
    if (!userEntered) {
        userEntered = "Freebird";
    }

    spotify.search({
        type: 'track',
        query: userEntered,
        limit: 5
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + err);
        }
        console.log("-----------------")
        console.log("Artist: ", data.tracks.items[0].album.artists[0].name);
        console.log("Song Name: ", data.tracks.items[0].name);
        console.log("Preview URL: ", data.tracks.items[0].href);
        console.log("Album Name: ", data.tracks.items[0].album.name);
        console.log("-----------------")
    });
}


//define function for logging command and data entered by user