const backBtn = document.querySelector('#back_Btn')

function goBack(){
    history.back();
    console.log("test")
}

backBtn.addEventListener('click', goBack)