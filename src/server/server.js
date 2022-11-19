// Setup empty JS object to act as endpoint for all routes
let projectData = {};
let weatherData = {};
let pictureData = {};
let countryData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors())

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = 8000;

const server = app.listen(port, listening);

function listening(){
    console.log('server running'); 
    console.log(`running on localhost: ${port}`);
};

const apiKey = 'nandans5';
const apiKey2 = 'd9b79b84180743b58b41c3a096e2ac90';
const apiKey3 = '31231659-4b8560ba86031db04384fca95';

app.get('/all', getData); 
function getData(req, res) {
    res.send(projectData);
}

app.post('/add', postData);
function postData(req, res){
    console.log(req.body)
    projectData = req.body;
    res.send(projectData) 
}

app.get('/allweather', getweatherData); 
function getweatherData(req, res) {
    res.send(weatherData);
}

app.post('/addweather', postweatherData);
function postweatherData(req, res){
    console.log(req.body)
    weatherData = req.body;
    res.send(weatherData) 
}

app.get('/allpicture', getpictureData); 
function getpictureData(req, res) {
    res.send(pictureData);
}

app.post('/addpicture', postpictureData);
function postpictureData(req, res){
    console.log(req.body)
    pictureData = req.body;
    res.send(pictureData) 
}

app.get('/allcountry', getcountryData); 
function getcountryData(req, res) {
    res.send(countryData);
}

app.post('/addcountry', postcountryData);
function postcountryData(req, res){
    console.log(req.body)
    countryData = req.body;
    res.send(countryData) 
}

app.get('/test', async (request, response) => {
    response.json({ text: "test" });
})

module.exports = app