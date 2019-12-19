
require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var moment = require('moment');
moment().format();

var axios = require('axios'); 
var fs = require('fs');

var totalCommand = process.argv;
var userCommand = process.argv[2];
var userEnteredData = totalCommand.slice(3).join(" ");
//write user entered data to the userEnteredInfo.txt file
fs.appendFile("userEnteredInfo.txt", userCommand + ", " + userEnteredData +"\n" , function(err) {

    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }
  
    // Otherwise, it will print: "movies.txt was updated!"
    console.log("userEnteredInfor.txt was updated!");
  
  });
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
        doWhatItSays(userEnteredData);
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
function movieThis(userEnteredData) {
    if (!userEnteredData) {
        userEnteredData = "jaws";
    }
    axios.get("https://www.omdbapi.com/?t=" + userEnteredData + "&y=&plot=short&apikey=trilogy")
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
function spotifySong(userEnteredData) {
    if (!userEnteredData) {
        userEnteredData = "Let It Be";
    }

    spotify.search({
        type: 'track',
        query: userEnteredData,
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

//define function for logging command and data entered by user in random.txt file

function doWhatItSays() {
    
    var fs = require("fs");

fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }
  var dataArray = data.split(",");
  var dataArrayCommand = dataArray[0];
  var userEnteredData = "";
  var userEnteredData = dataArray.slice(1).join(" ");
  
  if (dataArrayCommand === "concert-this"){
  }
switch (dataArrayCommand) {
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
        doWhatItSays(userEnteredData);
        break;
};
});
}
