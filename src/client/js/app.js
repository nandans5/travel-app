/* Global Variables */
const baseURL = 'http://api.geonames.org/searchJSON?maxRows=1&username=';
const baseURL2 = 'http://api.weatherbit.io/v2.0/forecast/daily?key=';
const baseURL3 = 'https://pixabay.com/api/?key=';
const apiKey = 'nandans5';
const apiKey2 = 'd9b79b84180743b58b41c3a096e2ac90';
const apiKey3 = '31231659-4b8560ba86031db04384fca95';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + '.'+ d.getDate()+'.'+ d.getFullYear();

// Functions

const getCityDetails = async (cityName)=>{
  const URL = await fetch(baseURL + apiKey + "&q="+ cityName);    
  try {
    const data = await URL.json();    
    console.log(data);
    const newData = data.geonames[0]
    return newData
  } catch(error) {
    console.log('getcity error');
  }   
}

const getWeatherData = async (lat, lng, arrDate)=>{
  const URL = await fetch(baseURL2 + apiKey2 + "&lat="+ lat + "&lon=" + lng);    
  try {
    const weatherData = await URL.json();
    let l = 0;   
    for ( let i = 0; i < 16; i++){
      if (weatherData.data[i].datetime == arrDate) {
        l = i
      }
    }
    const newWeatherData = weatherData.data[l]
    console.log(weatherData)
    return newWeatherData
  } catch(error) {
    console.log('getweather error');
  }   
}

const getPicture = async (cityName)=>{
  const URL = await fetch(baseURL3 + apiKey3 + "&q="+ cityName + "+city&image_type=photo");    
  try {
    const data = await URL.json();   
    console.log(data);
    const picURL = data.hits[0].webformatURL
    console.log(picURL)
    document.getElementById('city-image').setAttribute('src', picURL)
    const picData = data.hits[0]
    return picData
  } catch(error) {
    console.log('getpicture error');
  }   
}

const getCountryData = async (countryName)=>{
  const URL = await fetch("https://restcountries.com/v3.1/name/" + countryName);    
  try {
    const data = await URL.json();   
    console.log(data);
    document.getElementById('capital').innerHTML = 'Capital: ' + data[0].capital;
    document.getElementById('region').innerHTML = 'Region: ' + data[0].region;
    document.getElementById('subregion').innerHTML = 'Subregion: ' + data[0].subregion;
    const countryData = data[0]
    return countryData
  } catch(error) {
    console.log('getpicture error');
  }   
}

const postData = async (url, data) =>{
  const req = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  try {
    const postData = await req.json();
    return postData;
  } catch(error) {
    console.log('postdata error');
  }
};

const countDown = () => {
let countDownDate = new Date(document.getElementById('date').value).getTime();

// Update the count down every 1 second
let x = setInterval(function() {

  // Get today's date and time
  let now = new Date().getTime();

  // Find the distance between now and the count down date
  let distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById('countdown').innerHTML = days + 'd ' + hours + 'h '
  + minutes + 'm ' + seconds + 's ';

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById('countdown').innerHTML = 'ARRIVED';
  }
}, 1000);
}

const updateUI = async () => {
  const req = await fetch('/all');
  try{
    const data = await req.json();
    console.log(data)
    document.getElementById('city-heading').innerHTML = '----- Details About Destination -----';
    document.getElementById('country-name').innerHTML = 'Country Name: ' + data.newData.countryName;
    document.getElementById('latitude').innerHTML = 'Latitude: ' + data.newData.lat;
    document.getElementById('longitude').innerHTML = 'Longitude: ' + data.newData.lng;
  } catch(error) {
    console.log('updatui error');
  }
}

const updateWeatherUI = async () => {
  const req = await fetch('/allweather');
  try{
    const data = await req.json();
    console.log(data)
    document.getElementById('weather-heading').innerHTML = '----- Weather on Arrival -----';
    document.getElementById('weather-description').innerHTML = 'Description: ' + data.newWeatherData.weather.description;
    document.getElementById('max-temp').innerHTML = 'Max-Temp: ' + data.newWeatherData.max_temp;
    document.getElementById('min-temp').innerHTML = 'Min-Temp: ' + data.newWeatherData.min_temp;
  } catch(error) {
    console.log('updatweatherui error');
  }
}


function generate(e) {
  e.preventDefault()
  const cityName = document.getElementById('city-name').value;
  const content = document.getElementById('date').value; 
  getCityDetails(cityName)
  .then(function(newData){
    countDown()
    const lat = newData.lat
    const lng = newData.lng
    const countryName = newData.countryName
    postData('/add',  {newData:newData})
    .then(
      updateUI()
    )
    getCountryData(countryName)
    .then(function(countryData){
      postData('/addcountry', {countryData:countryData})
    })
    getWeatherData(lat, lng, content)
    .then(function(newWeatherData){
      countDown()
      postData('/addweather',  {newWeatherData:newWeatherData})
      .then(
        updateWeatherUI()
      )
    getPicture(cityName)
    .then(function(picData){
      postData('/addpicture', {picData:picData})
    })
    })
  })
}

export { getCityDetails }
export { getWeatherData }
export { getPicture }
export { getCountryData }
export { postData }
export { updateUI }
export { updateWeatherUI }
export { countDown }
export { generate }