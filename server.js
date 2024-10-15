/* NPMs */
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const requestIP = require('request-ip');
const session = require('express-session');
const https = require('https');
const fs = require('fs');
const randomstring = require("randomstring");

dotenv = require('dotenv').config()
const port = 10000

/* Paths */
app.use(express.static(path.join(__dirname, 'public')));

/* Set */
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Define the folder where the ejs files will be stored
app.set('views', path.join(__dirname, '/views'));

/* Use */
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SECRETKEY,
  resave: false,
  saveUninitialized: true
}));

/* Get */
// Redirects Users From "/" to "/home"
app.get('/', function(req, res) {
    res.redirect("/home");
});

app.post('/check', function(req, res) {
    // Assume you have body-parser middleware set up to handle form submissions
    const userInput = req.body.inputCheck; // Get the value from the input field

    // Check if the input matches 'xyz'
    if (userInput === 'xyz') {
        req.session.APPLE = true; // Set the APPLE property in the session
        res.send("Yes")
    } else {
        req.session.APPLE = false; // Optional: set it to false if it doesn't match
        res.redirect('/');
    }
});

app.get('/home', function(req, res){
    res.render('home');
});

app.get('*', function(req, res) {
    res.redirect("/home");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
