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

// sproduct function
function sproductFunction(event) {
    window.location.href = "sproduct.html";
}

let shopImg = document.getElementsByClassName("shopImg");

// Add event listeners to each shop item
for (let i = 0; i < shopImg.length; i++) {
    shopImg[i].addEventListener("click", function () {
        const selectedShopItem = shop[i];

        // Store selected item details in session storage
        sessionStorage.setItem("selectedImg", selectedShopItem.image);
        sessionStorage.setItem("selectedBrand", selectedShopItem.brand);
        sessionStorage.setItem("selectedName", selectedShopItem.name);
        sessionStorage.setItem("selectedPrice", selectedShopItem.price);
    });
}

// Retrieve data from session storage for sproduct page
let MainImg = document.querySelector(".MainImg");
let selectedBrand = document.getElementById("shop-brand");
let selectedName = document.querySelector(".shop-name");
let selectedPrice = document.querySelector(".shop-price");

// Update content if elements exist
if (MainImg) {
    MainImg.src = sessionStorage.getItem("selectedImg") || "";
}

if (selectedBrand) {
    selectedBrand.textContent = sessionStorage.getItem("selectedBrand") || "Brand";
}

if (selectedName) {
    selectedName.textContent = sessionStorage.getItem("selectedName") || "Product Name";
}

if (selectedPrice) {
    selectedPrice.textContent = `$${sessionStorage.getItem("selectedPrice") || "0.00"}`;
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

let quantityElement = document.getElementsByClassName("cart-row-quantity");
for(let i = 0; i < quantityElement.length; i++){
    let input = quantityElement[i];
    input.addEventListener("change", quantityChanged);
}

function quantityChanged(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCart();
}

// Cart Array
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Function to handle Add to Cart
function handleAddToCart(event) {
    event.preventDefault();

    // Identify the container for the product details
    let product, productName, productPrice, productImage;

    if (event.target.closest("#prodetails")) {
        // sproduct page structure
        product = event.target.closest("#prodetails");
        productName = product.querySelector(".shop-name")?.textContent.trim();
        productPrice = product.querySelector(".shop-price")?.textContent.trim();
        productImage = product.querySelector(".MainImg")?.src;
    } else if (event.target.closest(".pro")) {
        // shop page structure
        product = event.target.closest(".pro");
        productName = product.querySelector(".shop-name")?.textContent.trim();
        productPrice = product.querySelector(".shop-price")?.textContent.trim();
        productImage = product.querySelector(".shopImg")?.src;
    }

    // Check if we have all the product details
    if (productName && productPrice && productImage) {
        console.log(`Product added: ${productName}, Price: ${productPrice}, Image: ${productImage}`);

        const productDetails = {
            name: productName,
            price: productPrice,
            image: productImage,
        };

        cartItems.push(productDetails);

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        console.log("Cart items:", cartItems);
    } else {
        console.error("Product details are missing.");
    }
}

// Attach event listeners
document.querySelectorAll(".addToCart").forEach((cartButton) => {
    cartButton.addEventListener("click", handleAddToCart);
});

function loadCartFromLocalStorge(){
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if(storedCartItems){
        cartItems = storedCartItems;
        console.log("cart loaded from localStorage:", cartItems);
    }
}

loadCartFromLocalStorge();

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
    if(cartSubTotal){
        cartSubTotal.textContent = `$${total.toFixed(2)}`;  // Format the total to 2 decimal places
    }
    if(cartTotal){
        cartTotal.textContent = `$${total.toFixed(2)}`;  // Set the same value for the total
    }
}

updateCart();