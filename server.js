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

app.get('/home', function(req, res){
    res.render('home');
});

app.get('/unlock', function(req, res){
    if (req.session.ACCESS_TO_DISCORD == true){
        var TUCGU0W2_status_var = "True";
    } else {
        var TUCGU0W2_status_var = "False";
    }
    res.render('unlock', {TUCGU0W2: TUCGU0W2_status_var});
});

app.get('/dis', function(req, res){
    if(req.session.ACCESS_TO_DISCORD == true){
        res.render('dis', {serverId: process.env.SERVERID, channelId: process.env.CHANNELID});
    } else {
        res.send("<h1>Error, This Location Does Not Exist</h1><script>setTimeout(function() { window.location.href = '/home'; }, 5000);</script>")
    }
});

app.get('*', function(req, res) {
    res.redirect("/home");
});

/* Post */
app.post('/check', function(req, res) {
    const userInput = req.body.inputCheck; // Get the value from the input field
    if (userInput === process.env.DISCORD_ACCESS_KEY) {
        req.session.ACCESS_TO_DISCORD = true;
        res.send("<h1>Unlocked Access To A Private Part Of The Website; Discord</h1><script>setTimeout(function() { window.location.href = '/home'; }, 5000);</script>");
    } else {
        res.redirect('/');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
