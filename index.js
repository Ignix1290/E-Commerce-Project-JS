const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if(bar){
    bar.addEventListener("click", () => {
        nav.classList.add("active");
    })
}

if(close){
    close.addEventListener("click", () => {
        nav.classList.remove("active");
    })
}

//sproduct function
function sproductFunction(event){
    window.location.href = "sproduct.html";
}

let MainImg = document.getElementById("MainImg");
let shopImg = document.getElementsByClassName("shopImg");

for(let i = 0; i < shopImg.length; i++){
    shopImg[i].addEventListener("click", function(){
        sessionStorage.setItem("selectedImg", shopImg[i].src);
    });
}

let selectedImg = sessionStorage.getItem("selectedImg");
if(selectedImg){
    MainImg.src = selectedImg;
}
