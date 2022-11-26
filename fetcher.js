/*
* fetcher.js - takes a user supplied URL and file path, and writes the contents receieved from the URL to the designated file.
*/
 

// 1.) Should take two command line arguments: a URL, and a local file path.
// 2.) It should download the resource at the URL to the local path on your machine.
// 3.) Upon completion, it should print out a message like "Downloaded and saved 1235 bytes to ./index.html."

// Take in command line arguments;
const arguments = process.argv;
// Trim arguments down to only the user inputs
arguments.splice(0, 2);

// Request and GET the requested URL
const request = require('request');
const fs = require('fs');

const filePath = arguments[1];

// Get the requested URL --> This will take an unkown amount of time.
request('https://' + arguments[0], (error, response, body) => {

  if (error) {
    console.log('error:', error); // Print the error if one occurred
  } else {
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the body of the response
    // Write the contents of the response body to the file path.
    write(filePath, body, error);
  }
});

// Callback function that takes in the file path, and request content and writes it to a file.
const write = function(path, content) {
  fs.writeFile(path, content, err => {
    if (err) {
      console.error(err);
      console.log("Sorry, the request was unable to be saved to your file path.");
    }
    fs.stat(filePath, (error, stats) => {
      if (error) {
        console.log(error);
      } else {
        
        console.log(`File written successfully! Downloaded and saved ${stats.size} bytes to ${path}`);
        return stats.size;
      }
    });
  });
};

