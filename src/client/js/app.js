/* Global Variables */
const baseURL = 'http://api.geonames.org/searchJSON?maxRows=1&username=';
const apiKey = 'nandans5'; // check

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + '.'+ d.getDate()+'.'+ d.getFullYear();

// Functions

const getCityDetails = async (cityName)=>{
    const URL = await fetch(baseURL + apiKey + "&q="+ cityName);    
    try {
      const data = await URL.json();    // check variable
      console.log(data);
      const newData = data.geonames[0]
      return newData
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
        document.getElementById('country-name').innerHTML = data.countryName;
        document.getElementById('latitude').innerHTML = data.lat;
        document.getElementById('longitude').innerHTML = data.lng;
        console.log(data)
    } catch(error) {
        console.log('error');
    }
}



function generate(e) {
    e.preventDefault()
    const cityName = document.getElementById('city-name').value;
    const content = document.getElementById('feelings').value; 
    getCityDetails(cityName)
    .then(function(newData){
      const lat = newData.lat
      const lng = newData.lng
      const countryName = newData.countryName
      postData('/add',  {countryName:countryName, lat:lat, lng:lng})
      .then(
        updateUI()
      )
    })
}

export { getCityDetails }
export { postData }
export { updateUI }
export { generate }