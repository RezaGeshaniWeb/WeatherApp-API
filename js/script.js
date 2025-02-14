// select element
const main = document.querySelector('main')
const form = document.querySelector('form')
const inpSearch = document.querySelector('form>input')
const city = document.querySelector('#city')
const country = document.querySelector('#country')
const date = document.querySelector('#date')
const temp = document.querySelector('#temp')
const weather = document.querySelector('#weather')
const cloudy = document.querySelector('#cloudy')
const humidity = document.querySelector('#humidity')
const wind = document.querySelector('#wind')
const icon = document.querySelector('#icon')
const errAlert = document.querySelector('#err-alert')
const loader = document.querySelector('.loader')
// select element

// onload
getData('tehran')
// onload

// submit form
form.addEventListener('submit', e => {
    e.preventDefault()
    let value = inpSearch.value.trim()
    if (value == null) return null
    else getData(value)
})
// submit form

// fetch data
function getData(userSearch) {
    fetch("https://api.weatherapi.com/v1/current.json?key=e8a88f54ac554652abe135348242511&q=" + userSearch)
        .then(res => {
            if (res.ok) return res.json()
            Promise.reject()
        })
        .then(res => {
            console.log(res)
            loader.style.display = 'none'
            showResult(res)
            inpSearch.value = null
        })
        .catch(err => {
            console.log(err)
            loader.style.display = 'flex'
            if (inpSearch.value == '') errAlert.innerText = 'please enter the city'
            else errAlert.innerText = 'city not found'
            errAlert.classList.remove('scale-0')
            setTimeout(() => {
                errAlert.classList.add('scale-0')
                loader.style.display = 'none'
            }, 2200)
            inpSearch.value = null
        })
}
// fetch data

// show result
function showResult(data) {
    const loc = { ...data.location }
    const curr = { ...data.current }

    city.innerText = loc.name
    country.innerText = loc.country
    date.innerText = loc.localtime

    temp.innerText = curr.temp_c + "°c"
    weather.innerText = curr.condition.text
    icon.src = 'https:' + curr.condition.icon
    cloudy.innerText = curr.cloud + " %"
    humidity.innerText = curr.humidity + " %"
    wind.innerText = curr.wind_kph + " km/h"

    let code = curr.condition.code
    if (code === 1000) {
        main.style.backgroundImage = 'url(img/clear.jpg)'
    } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
    ) {
        main.style.backgroundImage = 'url(img/cloudy.jpg)'
    } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
    ) {
        main.style.backgroundImage = 'url(img/rainy.jpg)'
    } else {
        main.style.backgroundImage = 'url(img/snowy.jpg)'
    }
}
// show result