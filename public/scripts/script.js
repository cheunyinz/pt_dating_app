const backBtn = document.querySelector('#back_Btn')

function goBack(){
    history.back();
    console.log("test")
}

backBtn.addEventListener('click', goBack)

//

const locBtn = document.querySelector('#getLocation')

function getLocation(){
    if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
    });
    else
    console.log("geolocation not supported")
};

locBtn.addEventListener("click", getLocation)