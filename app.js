//jshint esversion:6

const express = require("express");  // require express module for server creation and routing  routes 
const bodyParser = require("body-parser"); // to parse the body of the post request 
const ejs = require("ejs"); // to use ejs as view engine
const _ = require("lodash"); // loadash is a library that helps us to manipulate strings and arrays and objects and stuff like lower case and upper case and all that stuff

const homeStartingContent = "";
const aboutContent = "";
const contactContent = "";

let posts = [];

const app = express(); //app is an object that contains all the methods and properties that we need to build our web server and our web application

app.set('view engine', 'ejs'); //set view engine to ejs so that we can use ejs files in our project

app.use(bodyParser.urlencoded({extended: true})); //bodyParser is a middleware that allows us to access the data that is sent from the client to the server in the request body and we can access it using the req.body object in our route handlers and we can use it to create and update new blog posts and store them in our database.
app.use(express.static("public")); //express.static is a built-in middleware function in Express. It serves static files and is based on serve-static. We can use it to serve static files such as images, CSS files, and JavaScript files in our Express application.

app.get("/", function(req, res){  // "/" is the home route
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  }); // passing the home page and the variable to the home.ejs file
});

app.get("/about", function(req, res) { // "/about" is the about route
  res.render("about", {aboutContent: aboutContent});  // passing the about page and the variable to the about.ejs file
});

app.get("/contact", function(req, res) { // "/contact" is the contact route
  res.render("contact", {contactContent: contactContent}); // passing the contact page and the variable to the contact.ejs file
});

app.get("/compose", function(req, res) { // "/compose" is the compose route
  res.render("compose"); // passing the compose page to the compose.ejs file
});

app.post("/compose", function(req, res) { // "/compose" is the compose route
  const post = {                          // creating a new object to store the title and the content of the post in the database
    title: req.body.postTitle,            // the title of the post is stored in the req.body.postTitle
    content: req.body.postBody,            // the content of the post is stored in the req.body.postBody
    image: req.body.postImage           // the image of the post is stored in the req.body.postImage 
  };
    
  posts.push(post); // pushing the post object to the posts array in the database

  res.redirect("/"); // redirecting to the home route

}); 


app.get("/posts/:postName", function(req, res) { // "/posts/:postName" is the dynamic route
  const requestedTitle = _.lowerCase(req.params.postName); // storing the title of the post in the requestedTitle variable

  posts.forEach(function(post) { // looping through the posts array in the database
    const storedTitle = _.lowerCase(post.title); // storing the title of the post in the storedTitle variable

    if (storedTitle === requestedTitle) { // checking if the title of the post in the database is equal to the title of the post in the url
      res.render("post", { // passing the post page and the title and the content of the post to the post.ejs file
        title: post.title,
        content: post.content,
        image: post.image
      });
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
