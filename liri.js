//Twitter api keys imported from secure file (keys.js)
var keys = require("./keys.js");
//Loading the modules
var fs = require('fs');
var spotify = require('spotify');
var request = require('request');
var twitter = require('twitter');

//Store twitter keys
var twitterClient = new Twitter ({
  consumer_key: keys.TWITTER.CONSUMER_KEY,
  consumer_secret: keys.TWITTER.CONSUMER_SECRET,
  access_token_key: keys.TWITTER.ACCESS_TOKEN_KEY,
  access_token_secret: keys.TWITTER.ACCESS_TOKEN_SECRET
});

//Store user request and declare variables
var command = process.argv[2],
var arg = process.argv[3],
var requestMsg = "",
var responseMsg = "";

//Console log and append file user request and data respones
function logAndAppend(input, output) {
  console.log(output);
  fs.appendFile("log.txt", input + "\n" + output, function(error) {
    if (error) {
      throw error;
    }
  })
};

//Create function to execute user request
function runCommand() {
  //If user requests "my-tweets"...
  if (command === "my-tweets") {
    twitterClient.get("statuses/user_timeline", function(error, tweets, response) {
      if (error) {
        throw error;
      }
      var tweetsArr = [];
      for (i = 0; i < tweets.length; i++) {
        tweetsArr.push(tweets[i].text);
      }
      requestMsg = "COMMAND: " + command;
      responseMsg = "================================================\n" +
                    "Last 20 tweets:\n" + tweetsArr.join("\n") + "\n\n";
      logAndAppend(requestMsg, responseMsg);
    });
  }