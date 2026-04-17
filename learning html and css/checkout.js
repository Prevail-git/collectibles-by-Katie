let cart = JSON.parse(localStorage.getItem("cart")) || [];

const totalElement = document.getElementById("checkout-total");
const paymentForm = document.getElementById("paymentForm");

// Calculate total
let total = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
}, 0);

totalElement.textContent = total.toLocaleString();

// Payment form submission
paymentForm.addEventListener("submit", function(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let handler = PaystackPop.setup({
        key: "pk_test_1d486a5a30836a0a13ed449b2754210a811de88d", // Replace this
        email: document.getElementById("email").value,
        amount: total * 100, // convert to kobo
        currency: "NGN",
        callback: function(response) {
            alert("Payment successful! Ref: " + response.reference);
            localStorage.removeItem("cart");
            window.location.href = "index.html";
        },
        onClose: function() {
            alert("Transaction cancelled");
        }
    });

    handler.openIframe();
});