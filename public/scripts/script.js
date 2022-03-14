const backBtn = document.querySelector('#back_Btn')

function goBack() {
    history.back();
    console.log("test")
}

backBtn.addEventListener('click', goBack)

//

const locBtn = document.querySelector('#getLocation')

function getLocation() {
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
        });
    else
        console.log("geolocation not supported")
};

locBtn.addEventListener("click", getLocation)


//REST COUNTRY API

// document.addEventListener('DOMContentLoaded', () => {
//     const selectCountry = document.querySelector('#landen');
//     fetch(`https://restcountries.com/v2/all`)
//         .then(res => {
//             return res.json();
//         }).then(data => {
//             console.log(data);
//             let output = "";
//             data.forEach(country => {
//                 output += `<option value="${country.name}">${country.name}</option>`;
//             })
//             selectCountry.innerHTML = output;
//         }).then(err => {
//             console.log(err);
//         })
//         .catch(err => {
//             console.log(err);
//         })

// });


//generate countries in the dropdown list
const selectCountry = document.querySelector('#userCountry');
const restCountriesApi_url = "https://restcountries.com/v2/all";

async function getCountries() {
const response = await fetch(restCountriesApi_url);
const data = await response.json();
let output = "";

data.forEach(country => {
    output += `<option value="${country.region}">${country.name}</option>`;
})

selectCountry.innerHTML = output
}

document.addEventListener('DOMContentLoaded', getCountries)


//get the value of the selected country in the drowdown list
const submitRegisterBtn = document.querySelector('#submitPIBtn');
const h2 = document.querySelector('h2');
var userCountryValue = selectCountry.options[selectCountry.selectedIndex].text;

function postSelectedCountry(){

console.log(userCountryValue)
h2.innerText = selectCountry.options[selectCountry.selectedIndex].text;
}



selectCountry.addEventListener('change', postSelectedCountry)


    // const countryData = {
    //     countryName,
    //     regionName
    // }
    
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(countryData)
    // };
    // const res = await fetch('/preference', options);
    // const json = await res.json();
    // console.log(json);