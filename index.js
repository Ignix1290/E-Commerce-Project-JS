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

//Shop Array
const shop = [
    {
        brand: "adidas",
        name: "Shirt Half-Sleeve",
        image: "./images/products/f1.jpg",
        rating: 5,
        price: 78
    },
    {
        brand: "adidas",
        name: "Shirt Half-Sleeve",
        image: "./images/products/f2.jpg",
        rating: 5,
        price: 58
    },
    {
        brand: "adidas",
        name: "Shirt Half-Sleeve",
        image: "./images/products/f3.jpg",
        rating: 5,
        price: 68
    },
    {
        brand: "adidas",
        name: "Shirt Half-Sleeve",
        image: "./images/products/f4.jpg",
        rating: 5,
        price: 60
    },
    {
        brand: "adidas",
        name: "Shirt Half-Sleeve",
        image: "./images/products/f5.jpg",
        rating: 5,
        price: 65
    },
    {
        brand: "adidas",
        name: "Shirt Full-Sleeve",
        image: "./images/products/f6.jpg",
        rating: 5,
        price: 88
    },
    {
        brand: "adidas",
        name: "Girls Pant",
        image: "./images/products/f7.jpg",
        rating: 5,
        price: 50
    },
    {
        brand: "adidas",
        name: "Girls Top",
        image: "./images/products/f8.jpg",
        rating: 5,
        price: 55
    },
    {
        brand: "adidas",
        name: "Shirt Full-Sleeve",
        image: "./images/products/n1.jpg",
        rating: 5,
        price: 63
    },
    {
        brand: "adidas",
        name: "Shirt Full-Sleeve",
        image: "./images/products/n2.jpg",
        rating: 5,
        price: 67
    },
    {
        brand: "adidas",
        name: "Shirt Full-Sleeve",
        image: "./images/products/n3.jpg",
        rating: 5,
        price: 78
    },
    {
        brand: "adidas",
        name: "Shirt Half-Sleeve",
        image: "./images/products/n4.jpg",
        rating: 5,
        price: 55
    },
    {
        brand: "adidas",
        name: "Shirt Full-Sleeve",
        image: "./images/products/n5.jpg",
        rating: 5,
        price: 77
    },
    {
        brand: "adidas",
        name: "Half Pant",
        image: "./images/products/n6.jpg",
        rating: 5,
        price: 45
    },
    {
        brand: "adidas",
        name: "Shirt Full-Sleeve",
        image: "./images/products/n7.jpg",
        rating: 5,
        price: 77
    },
    {
        brand: "adidas",
        name: "Shirt Half-Sleeve",
        image: "./images/products/n8.jpg",
        rating: 5,
        price: 75
    }
];


//sproduct function
function sproductFunction(event){
    window.location.href = "sproduct.html";
}

let MainImg = document.getElementById("MainImg");
let shopImg = document.getElementsByClassName("shopImg");

for(let i = 0; i < shopImg.length; i++){
    shopImg[i].addEventListener("click", function(){
        const selectedShopItem = shop[i];

        sessionStorage.setItem("selectedImg", selectedShopItem.image);
        sessionStorage.setItem("selectedBrand", selectedShopItem.brand);
        sessionStorage.setItem("selectedName", selectedShopItem.name);
        sessionStorage.setItem("selectedPrice", selectedShopItem.price);
    });
}

let selectedImg = sessionStorage.getItem("selectedImg");
let selectedBrand = document.getElementById("shop-brand");
let selectedName = document.getElementById("shop-name");
let selectedPrice = document.getElementById("shop-price");

// console.log("Retrieved from sessionStorage:", selectedImg, selectedBrand, selectedName, selectedPrice);

if (MainImg && selectedImg) {
    MainImg.src = selectedImg;
}
if(selectedBrand){
    selectedBrand.textContent = sessionStorage.getItem("selectedBrand");
}
if(selectedName){
    selectedName.textContent = sessionStorage.getItem("selectedName");
}
if(selectedPrice){
    selectedPrice.textContent = "$" + sessionStorage.getItem("selectedPrice");
}


//Cart Functionality
let remove_from_cart = document.getElementsByClassName("remove-from-cart");
for(let i = 0; i < remove_from_cart.length; i++){
    let removeBtn = remove_from_cart[i];
    removeBtn.addEventListener("click", function(event){
        event.target.parentElement.parentElement.remove();
        updateCart();
    });
}

function updateCart(){
    let cartRows = document.getElementsByClassName("cart-row");
    let total = 0;
    for(let i = 0; i < cartRows.length; i++){
        let priceElement = cartRows[i].querySelector(".cart-row-price").textContent;
        let price = parseFloat(priceElement.replace('$', ''));
        let quantityElement = cartRows[i].querySelector(".cart-row-quantity");
        let quantity = parseFloat(quantityElement.value);
        let subTotalElement = cartRows[i].querySelector(".cart-row-subtotal");
        let subTotal = price * quantity;
        subTotalElement.textContent = `$${subTotal.toFixed(2)}`;
        total += subTotal;
        quantityElement.addEventListener('change', updateCart);
    }
    let cartSubTotal = document.getElementById("cart-subtotal");
    let cartTotal = document.getElementById("cart-total");
    cartSubTotal.textContent = `$${total.toFixed(2)}`;  // Format the total to 2 decimal places
    cartTotal.textContent = `$${total.toFixed(2)}`;  // Set the same value for the total
}

updateCart();