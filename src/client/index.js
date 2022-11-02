import { getCityDetails } from './js/app'
import { postData } from './js/app'
import { updateUI } from './js/app'
import { generate } from './js/app'

import './styles/style.scss'


alert("I EXIST")
console.log("CHANGE!!");

document.getElementById('generate').addEventListener('click', generate)

export {
    getCityDetails, postData, updateUI, generate
}