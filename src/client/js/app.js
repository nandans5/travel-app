/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?appid=';
const apiKey = '898eb0903c883495ba6d5ef63900fc72&units=imperial'; // check

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + '.'+ d.getDate()+'.'+ d.getFullYear();

// Functions

const getWeather = async (zipCode)=>{
    const URL = await fetch(baseURL + apiKey + "&zip="+ zipCode);    
    try {
      const newData = await URL.json();    // check variable
      console.log(newData);
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
        document.getElementById('date').innerHTML = newDate;
        document.getElementById('temp').innerHTML = data.temp;
        document.getElementById('content').innerHTML = data.content.toString();
        console.log(data)
    } catch(error) {
        console.log('error');
    }
}



function generate(e) {
    e.preventDefault()
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value; 
    getWeather(zipCode)
    .then(function(newData){
      const temp = newData.main.temp
      postData('/add',  {date:newDate, temp:temp, content:content})
      .then(
        updateUI()
      )
    })
}

document.getElementById('generate').addEventListener('click', generate)