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
      console.log('error');
    }   
}

const getWeatherData = async (lat, lng)=>{
    const URL = await fetch(baseURL2 + apiKey2 + "&lat="+ lat + "&lon=" + lng);    
    try {
      const data = await URL.json();   
      console.log(data);
    } catch(error) {
      console.log('error');
    }   
}

const getPicture = async (cityName)=>{
  const URL = await fetch(baseURL3 + apiKey3 + "&q="+ cityName + "+city&image_type=photo");    
  try {
    const data = await URL.json();   
    console.log(data);
    // return data
  } catch(error) {
    console.log('error');
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
        console.log(postData);
        return postData;
    } catch(error) {
        console.log('error');
    }
};

const updateUI = async () => {
    const req = await fetch('/all');
    try{
        const data = await req.json();
        document.getElementById('country-name').innerHTML = 'Country Name: ' + data.countryName;
        document.getElementById('latitude').innerHTML = 'Latitude: ' + data.lat;
        document.getElementById('longitude').innerHTML = 'Longitude: ' + data.lng;
        // document.getElementById('city-image').setAttribute('src', data.picURL) try query selector
        console.log(data)
    } catch(error) {
        console.log('error');
    }
}



function generate(e) {
    e.preventDefault()
    const cityName = document.getElementById('city-name').value;
    const content = document.getElementById('date').value; 
    getCityDetails(cityName)
    .then(function(newData){
      const lat = newData.lat
      const lng = newData.lng
      const countryName = newData.countryName
      getWeatherData(lat, lng)
      getPicture(cityName)
      postData('/add',  {countryName:countryName, lat:lat, lng:lng})
      .then(
        updateUI()
      )
    })
}

export { getCityDetails }
export { getWeatherData }
export { getPicture }
export { postData }
export { updateUI }
export { generate }