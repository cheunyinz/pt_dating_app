//back button

const backBtn = document.querySelector('#back_Btn')

function goBack() {
    history.back();
    console.log("test")
}

if (backBtn) {
    backBtn.addEventListener('click', goBack)
}


const closeBtn = document.querySelector('#close_Btn');
const addedPopup = document.querySelector('#added_Popup');

function closingPopup() {
    addedPopup.classList.remove('showPopup')
    console.log("het werkt")
}

if (closeBtn && addedPopup) {
    closeBtn.addEventListener('click', closingPopup)
}


//get the user current location

const locBtn = document.querySelector('#getLocation')

function getLocation() {
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
        });
    else
        console.log("geolocation not supported")
};

if (locBtn) {
    locBtn.addEventListener("click", getLocation)
}




//generate countries in the dropdown list
const selectCountry = document.querySelector('#userCountry');
const selectRegion = document.querySelector('#userRegion');
const restCountriesApi_url = "https://restcountries.com/v2/all";

async function getCountries() {
    const response = await fetch(restCountriesApi_url);
    const data = await response.json();
    let output = "";

    data.forEach(country => {
        output += `<option value="${country.name}">${country.name}</option>`;
    })

    selectCountry.innerHTML = output;
}
if (selectCountry) {
    document.addEventListener('DOMContentLoaded', getCountries)
}



//get the value of the selected country in the drowdown list
const submitRegisterBtn = document.querySelector('#submitPIBtn');

function passCountryValue() {

    let selectedCountry = selectCountry.value;
    localStorage.setItem("ddvalue", selectedCountry);
    return true;
}

if (submitRegisterBtn && selectCountry) {
    submitRegisterBtn.addEventListener('click', passCountryValue)
}

//have the value of the selected country in the value of the location preference options

const countryPref = document.querySelector("#userCountry")
const continentPref = document.querySelector("#userContinent");
const countryPrefFlag = document.querySelector("#countryFlag");
const continentPrefFlag = document.querySelector("#continentFlag")
let userCountry = localStorage.getItem("ddvalue");


async function getCountryValue() {
    const response = await fetch(restCountriesApi_url);
    const data = await response.json();
    let userData = data.find(country => country.name === userCountry);
    countryPref.value = userData.name;
    countryPrefFlag.src = userData.flag;
    countryPrefFlag.alt = "Flag of" +" "+ userData.name;
    continentPref.value = userData.region;
    continentPrefFlag.src = "images/preference_location_icons/"+userData.region+".png";
    continentPrefFlag.alt = "Flag of" +" "+ userData.region;
}

if (countryPref && continentPref && userCountry && restCountriesApi_url) {
    document.addEventListener('DOMContentLoaded', getCountryValue)
}



