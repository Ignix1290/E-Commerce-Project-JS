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

if(selectedImg){
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


// Cart Functionality
// Cart Functionality
document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Function to display cart items
    function renderCart() {
        const cartTableBody = document.querySelector("#cart tbody");
        if (!cartTableBody) {
            console.error("Cart table body not found");
            return;
        }
        
        cartTableBody.innerHTML = ""; // Clear the cart table

        let total = 0; // Initialize total
        cartItems.forEach((item, index) => {
            const cartRow = document.createElement("tr");
            const itemTotal = parseFloat(item.price.replace('$', '')) * item.quantity;
            total += itemTotal; // Update total
            
            cartRow.innerHTML = `
                <td><button onclick="removeFromCart(${index})"><i class='bx bx-x-circle'></i></button></td>
                <td><img src="${item.image}" alt="${item.name}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
                <td>$${itemTotal.toFixed(2)}</td>
            `;
            cartTableBody.appendChild(cartRow);
        });

        // Update total in the Cart Totals section
        document.querySelector("#subtotal td:last-child").innerHTML = `$${total.toFixed(2)}`;
        document.querySelector("#cart-add #subtotal td:last-child strong").innerHTML = `$${total.toFixed(2)}`;
    }

    // Function to add items to the cart
    window.addToCart = function() {
        const productName = document.getElementById("shop-name").textContent;
        const productPrice = document.getElementById("shop-price").textContent;
        const productImage = document.getElementById("MainImg").src;
        const productQuantity = document.querySelector('input[type="number"]').value;

        const productExists = cartItems.find(item => item.name === productName);

        if (productExists) {
            productExists.quantity += parseInt(productQuantity);
        } else {
            cartItems.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: parseInt(productQuantity)
            });
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        renderCart();
    }

    // Function to update quantity
    window.updateQuantity = function(index, quantity) {
        if (quantity <= 0) {
            removeFromCart(index);
        } else {
            cartItems[index].quantity = parseInt(quantity);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            renderCart();
        }
    }

    // Function to remove items from cart
    window.removeFromCart = function(index) {
        cartItems.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        renderCart();
    }

    renderCart(); // Initial render of the cart
});
