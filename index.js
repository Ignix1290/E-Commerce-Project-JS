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

// Initialize cartItems array from localStorage or as an empty array
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
console.log("Initial cart items:", cartItems);  // Debugging: Check initial cart items

// Function to handle adding a product to the cart
function handleAddToCart(event) {
    event.preventDefault();
    console.log("Add to cart clicked"); // Debugging: Check if function is called

    let product, productName, productPrice, productImage;

    // Identifying product details based on click target
    if (event.target.closest("#prodetails")) {
        product = event.target.closest("#prodetails");
        productName = product.querySelector(".shop-name")?.textContent.trim();
        productPrice = parseFloat(product.querySelector(".shop-price")?.textContent.trim().replace('$', ''));
        productImage = product.querySelector(".MainImg")?.src;
    } else if (event.target.closest(".pro")) {
        product = event.target.closest(".pro");
        productName = product.querySelector(".shop-name")?.textContent.trim();
        productPrice = parseFloat(product.querySelector(".shop-price")?.textContent.trim().replace('$', ''));
        productImage = product.querySelector(".shopImg")?.src;
    }

    // If valid product details exist, add to the cart
    if (productName && productPrice && productImage) {
        const productDetails = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1, // Default quantity is 1
        };

        addToCart(productDetails); // Call the function to add the item to the cart
    } else {
        console.error("Product details are missing.");
    }
}

// Function to add item to the cart
function addToCart(item) {
    console.log("Adding item to cart:", item); // Debugging: Check item being added
    
    // Check if the item already exists in cartItems array based on image
    let existingItem = cartItems.find(cartItem => cartItem.image === item.image);

    if (existingItem) {
        // If item exists, increase the quantity
        existingItem.quantity += 1;
        console.log(`Updated quantity for ${item.name}:`, existingItem.quantity); // Debugging
    } else {
        // If item does not exist, push the new item
        cartItems.push(item);
        console.log(`Added new item: ${item.name}`); // Debugging
    }

    // Save updated cartItems to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    renderCart(); // Re-render the cart to reflect updates
}


// Function to render the cart dynamically
function renderCart() {
    console.log("Rendering cart...");  // Debugging: Check if rendering happens
    
    // Check if cartTableBody exists on the page (only exists on cart page)
    let cartTableBody = document.querySelector("#cart tbody");
    if (!cartTableBody) return;  // Exit if the cart is not present on the page

    cartTableBody.innerHTML = "";  // Clear current rows

    // Render each item in the cart
    cartItems.forEach(item => {
        let row = document.createElement("tr");
        row.classList.add("cart-row");
        row.dataset.productId = item.id;  // Set the product ID here for later reference

        row.innerHTML = `
            <td><i class='bx bx-x-circle remove-from-cart'></i></td>
            <td><img src="${item.image}" alt=""></td>
            <td>${item.name}</td>
            <td class="cart-row-price">$${item.price.toFixed(2)}</td>
            <td><input class="cart-row-quantity" type="number" value="${item.quantity}" onchange="quantityChanged(event, ${item.id})"></td>
            <td class="cart-row-subtotal">$${(item.price * item.quantity).toFixed(2)}</td>
        `;

        cartTableBody.appendChild(row);
    });

    // Rebind remove and quantity change functions
    attachEventListeners();
    updateCart();
    updateOrderSummary();
}


// Function to attach event listeners for removing items and quantity changes
function attachEventListeners() {
    // Attach event listener for removing items
    const removeButtons = document.getElementsByClassName("remove-from-cart");
    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener("click", function (event) {
            const itemImage = event.target.closest("tr").querySelector("img").src; // Get image src
            console.log("Removing item with Image Src:", itemImage); // Debugging
            removeFromCart(itemImage);
        });
    }
}


// Remove item from the cart and update localStorage
function removeFromCart(itemImage) {
    console.log("Removing item with Image Src:", itemImage); // Debugging: Check item being removed
    
    // Remove the item based on its image source
    cartItems = cartItems.filter(item => item.image !== itemImage);
    
    // Save updated cartItems to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    
    renderCart(); // Re-render the cart after removal
}


// Handle quantity change
function quantityChanged(event, itemId) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;  // Ensure the quantity is always a positive number
    }

    // Update quantity in cartItems
    let cartItem = cartItems.find(item => item.id === itemId);

    if (cartItem) {
        cartItem.quantity = parseInt(input.value);  // Update the quantity
        localStorage.setItem("cartItems", JSON.stringify(cartItems));  // Save updated cart
    }

    // Recalculate cart totals
    updateCart();
    updateOrderSummary();
}

// Function to update cart totals (subtotal, total)
function updateCart() {
    let cartRows = document.getElementsByClassName("cart-row");
    let total = 0;

    // Calculate total for each item and update subtotal
    for (let i = 0; i < cartRows.length; i++) {
        const priceElement = cartRows[i].querySelector(".cart-row-price").textContent;
        const price = parseFloat(priceElement.replace("$", ""));
        const quantityElement = cartRows[i].querySelector(".cart-row-quantity");
        const quantity = parseInt(quantityElement.value, 10);
        const subTotalElement = cartRows[i].querySelector(".cart-row-subtotal");
        const subTotal = price * quantity;

        subTotalElement.textContent = `$${subTotal.toFixed(2)}`;  // Update subtotal
        total += subTotal;
    }

    // Update the cart totals in the UI
    const cartSubTotal = document.getElementById("cart-subtotal");
    const cartTotal = document.getElementById("cart-total");

    if (cartSubTotal) {
        cartSubTotal.textContent = `$${total.toFixed(2)}`;
    }
    if (cartTotal) {
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Call renderCart on page load to initialize cart display
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});

document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', handleAddToCart);
});

console.log("Cart items after addition:", cartItems);

// Checkout Page radio functionality
document.addEventListener("DOMContentLoaded", () => {
    const paymentOptions = document.querySelectorAll("input[name='payment']");
    const cardForm = document.getElementById("card-form");
    const upiForm = document.getElementById("upi-form");
    const codDetails = document.getElementById("cash-on-delivery-details");

    const hideAllDetails = () => {
        if (cardForm) cardForm.style.display = "none";
        if (upiForm) upiForm.style.display = "none";
        if (codDetails) codDetails.style.display = "none";
    };    

    paymentOptions.forEach(option => {
        option.addEventListener("change", () => {
            hideAllDetails(); // Hide all details initially

            // Show the relevant details based on selected option
            if (option.id === "Credit or Debit Cards") {
                cardForm.style.display = "flex";
            } else if (option.id === "UPI") {
                upiForm.style.display = "flex";
            } else if (option.id === "Cash on delivery") {
                codDetails.style.display = "block";
            }
        });
    });

    hideAllDetails(); // Initially hide all details
});

// Calculate total quantity of items in cart
function getTotalQuantity() {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
}

// Calculate delivery fee based on payment method
function getDeliveryFee() {
    const codOption = document.querySelector('input[name="payment"][id="Cash on delivery"]');  // Correct ID selector
    return codOption && codOption.checked ? 5 : 0;  // $5 if COD is selected, otherwise $0
}


// Calculate the total order price including delivery fee
function getOrderTotal() {
    let totalPrice = 0;

    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
    });

    totalPrice += getDeliveryFee();  // Add delivery fee if applicable
    return totalPrice;
}

// Update the order summary UI
const updateOrderSummary = () => {
    // Update total quantity
    const totalQuantityElement = document.getElementById('total-quantity');
    if (totalQuantityElement) {
        totalQuantityElement.textContent = getTotalQuantity();
    }

    // Update delivery fee
    const deliveryFeeElement = document.getElementById('delivery-fee');
    if (deliveryFeeElement) {
        deliveryFeeElement.textContent = `$${getDeliveryFee()}`;
    }

    // Update order total
    const orderTotalElement = document.getElementById('order-total-price');
    if (orderTotalElement) {
        orderTotalElement.textContent = `$${getOrderTotal().toFixed(2)}`;
    }
};

document.querySelectorAll("input[name='payment']").forEach(option => {
    option.addEventListener("change", () => {
        updateOrderSummary();  // Update the order summary when payment method changes
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Initialize the order summary as soon as the page loads
    updateOrderSummary();
});

// Function to show modal
function showOrderConfirmation() {
    const modal = document.getElementById('order-modal');
    modal.style.display = 'flex'; // Show the modal
}

// Function to close the modal
function closeOrderConfirmation() {
    const modal = document.getElementById('order-modal');
    modal.style.display = 'none'; // Hide the modal
}

// Function to empty the cart and clear from localStorage
function emptyCart() {
    cartItems = []; // Empty the cart array
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Clear the cart in localStorage
    renderCart(); // Re-render the cart (this should clear the cart in the UI)
    updateOrderSummary(); // Update order summary to show empty cart values
}

// Add event listener to the button
document.querySelector('#order-total button').addEventListener('click', () => {
    showOrderConfirmation();  // Show the confirmation modal
    emptyCart();               // Empty the cart
});

// Add event listener to close the modal
document.querySelector('#close-modal').addEventListener('click', closeOrderConfirmation);

// Load cart from localStorage
function loadCartFromStorage() {
    const storedCart = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCart && Array.isArray(storedCart)) {
        cartItems = storedCart;
        renderCart(); // Re-render cart with items from localStorage
        updateOrderSummary(); // Update the order summary
    }
}

// Run this when the page loads
loadCartFromStorage();

