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

document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout-btn');

    if (checkoutButton) {
        // Add event listener only if the button exists
        checkoutButton.addEventListener('click', function (event) {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            if (cartItems.length === 0) {
                alert("Your cart is empty. Please add items before proceeding to checkout.");
            } else {
                window.location.href = 'checkout.html';
            }
        });
    }
});

const updateOrderSummary = () => {
    const totalQuantityElement = document.getElementById('total-quantity');
    if (totalQuantityElement) {
        totalQuantityElement.textContent = getTotalQuantity();
    }

    const deliveryFeeElement = document.getElementById('delivery-fee');
    if (deliveryFeeElement) {
        deliveryFeeElement.textContent = `$${getDeliveryFee()}`;
    }

    const orderTotalElement = document.getElementById('order-total-price');
    if (orderTotalElement) {
        orderTotalElement.textContent = `$${getOrderTotal().toFixed(2)}`;
    }
};

// Helper functions
function getTotalQuantity() {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
}

function getDeliveryFee() {
    const codOption = document.querySelector('input[name="payment"][id="Cash on delivery"]');
    return codOption && codOption.checked ? 5 : 0;
}

function getOrderTotal() {
    let totalPrice = 0;
    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    totalPrice += getDeliveryFee();
    return totalPrice;
}

document.addEventListener("DOMContentLoaded", () => {
    // Assuming cartItems is loaded and available for the checkout page
    updateOrderSummary();  // Call this to update the prices on the checkout page
});


console.log("Cart items after addition:", cartItems);

// Checkout Page radio functionality
document.addEventListener("DOMContentLoaded", () => {
    // Identify elements
    const checkoutButton = document.querySelector("#order-total button");
    const checkoutForm = document.getElementById("checkout-form");
    const orderModal = document.getElementById("order-modal");
    const closeModal = document.getElementById("close-modal");

    // Payment forms
    const cardForm = document.getElementById("card-form");
    const upiForm = document.getElementById("upi-form");
    const codDetails = document.getElementById("cash-on-delivery-details");
    const paymentOptions = document.querySelectorAll("input[name='payment']");

    // Check if these elements exist before proceeding
    if (!checkoutButton || !checkoutForm || !orderModal || !closeModal) {
        console.warn("Skipping checkout logic: Necessary elements are missing from the DOM.");
        return;
    }

    // Log to check if the elements are correctly fetched
    console.log('cardForm:', cardForm);
    console.log('upiForm:', upiForm);
    console.log('codDetails:', codDetails);

    // Hide all payment details initially
    const hideAllDetails = () => {
        // Check if the form elements exist before attempting to access their styles
        if (cardForm) cardForm.style.display = "none";
        if (upiForm) upiForm.style.display = "none";
        if (codDetails) codDetails.style.display = "none";
    };

    // Event listener for payment method change
    paymentOptions.forEach(option => {
        option.addEventListener("change", () => {
            console.log("Payment option selected:", option.id); // Debugging
            hideAllDetails();
            if (option.id === "Credit or Debit Cards") {
                cardForm.style.display = "block";
            } else if (option.id === "UPI") {
                upiForm.style.display = "block";
            } else if (option.id === "Cash on delivery") {
                codDetails.style.display = "block";
            }
            // Update the order summary based on the selected payment method
            updateOrderSummary();
        });
    });

    // Your existing functionality starts here if elements are found
    const validateForm = () => {
        const inputs = checkoutForm.querySelectorAll("input, textarea");
        
        for (let input of inputs) {
            if (!input.value.trim()) {
                alert(`Please fill out the ${input.placeholder || "required"} field.`);
                input.focus();
                return false;
            }
        }
    
        const selectedPayment = document.querySelector("input[name='payment']:checked");
        if (!selectedPayment) {
            alert("Please select a payment method.");
            return false;
        }
    
        if (selectedPayment.id === "Credit or Debit Cards") {
            const cardNumber = document.getElementById("card-number");
            const expiryDate = document.getElementById("expiry-date");
            const cvv = document.getElementById("cvv");
            
            if (!(cardNumber && cardNumber.value.trim())) {
                alert("Please fill out the card number.");
                return false;
            }
            if (!(expiryDate && expiryDate.value.trim())) {
                alert("Please fill out the expiry date.");
                return false;
            }
            if (!(cvv && cvv.value.trim())) {
                alert("Please fill out the CVV.");
                return false;
            }
        }
    
        if (selectedPayment.id === "UPI") {
            const upiId = document.getElementById("upi-id");
            
            if (!(upiId && upiId.value.trim())) {
                alert("Please fill out your UPI ID.");
                return false;
            }
        }
    
        return true;
    };

    checkoutButton.addEventListener("click", (event) => {
        if (!validateForm()) {
            event.preventDefault();
            return;
        }

        orderModal.style.display = "block";
        localStorage.removeItem("cartItems");
    });

    closeModal.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    const loadCartFromStorage = () => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCart && Array.isArray(storedCart)) {
            cartItems = storedCart;
            renderCart();
            updateOrderSummary();
        }
    };

    loadCartFromStorage();
});


//Google login
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    // Send the ID token to your backend for verification
    fetch('http://localhost:3000/api/google-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
    })
    .then(res => res.json())
    .then(data => {
        console.log("Server response:", data);
        // Handle login success or failure based on backend response
    })
    .catch(err => {
        console.error("Error during login:", err);
    });
}

// Load the Google API client
function initClient() {
    gapi.client.init({
      clientId: '614843922014-990h9dl1djss2j4pb1halk14neod30bf.apps.googleusercontent.com',
      scope: 'profile email'
    }).then(function () {
      // Listen for the sign-in state
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    });
}
  
  // Handle login state change
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      // Logged in, now you can make API calls to fetch user info
      getUserInfo();
    } else {
      // Not logged in
      console.log("User is not signed in.");
    }
}
  
  // Handle user info retrieval after login
function getUserInfo() {
    var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
    console.log("Name: " + profile.getName());
    console.log("Email: " + profile.getEmail());
    // Do something with user info, like storing it or logging it to the console
}
  
  // Initiate login when button is clicked
document.getElementById("google-login-button").onclick = function() {
    gapi.auth2.getAuthInstance().signIn();
};

gapi.load('client:auth2', initClient);

  