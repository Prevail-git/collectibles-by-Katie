let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");

// Update cart count on load
function updateCartCount() {
    cartCount.textContent = cart.length;
}

updateCartCount();

// Add to cart functionality
const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const product = {
            name: button.dataset.name,
            price: parseInt(button.dataset.price),
            image: button.dataset.image,
            quantity: 1
        };

        // Check if product already exists
        const existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        alert("Product added to cart ✅");
    });
});