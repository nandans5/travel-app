import { getCityDetails } from './js/app'
import { getWeatherData } from './js/app'
import { getPicture } from './js/app'
import { getCountryData } from './js/app'
import { postData } from './js/app'
import { updateUI } from './js/app'
import { updateWeatherUI } from './js/app'
import { countDown } from './js/app'
import { generate } from './js/app'

import './styles/style.scss'


alert("I EXIST")
console.log("CHANGE!!");

document.getElementById('generate').addEventListener('click', generate)

export {
    getCityDetails, getWeatherData, getPicture, getCountryData, postData, updateUI, updateWeatherUI, countDown, generate
}