let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

// Update cart count
function updateCartCount() {
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Display cart
function displayCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0";
        updateCartCount();
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>Price: ₦${item.price.toLocaleString()}</p>
                    
                    <div class="quantity-controls">
                        <button onclick="decreaseQty(${index})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQty(${index})">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    cartTotal.textContent = total.toLocaleString();
    updateCartCount();
}

// Increase quantity
function increaseQty(index) {
    cart[index].quantity += 1;
    saveCart();
    displayCart();
}

// Decrease quantity
function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }
    saveCart();
    displayCart();
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

displayCart();