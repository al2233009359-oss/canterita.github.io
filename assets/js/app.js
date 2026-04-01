const cart = [];
const cartCount = document.getElementById("cartCount");
const contentProducts = document.getElementById("contentProducts");
const total = document.getElementById("total");
const buttons = document.querySelectorAll(".btn-add");

buttons.forEach(button => {
    button.addEventListener("click", addToCart);
});
function addToCart(e) {
    const product = e.target.closest(".product");

    const name = product.querySelector("h4").textContent;
    const priceText = product.querySelector("#currentPrice").textContent;
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
    const img = product.querySelector("img").src;

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name,
            price,
            img,
            quantity: 1
        });
    }

    showAlert("Producto agregado al carrito", "success");
    renderCart();
}
function showAlert(message, type) {
    const alert = document.createElement("div");
    alert.classList.add("alert", type);
    alert.textContent = message;

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}
function renderCart() {
    contentProducts.innerHTML = "";

    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${item.img}" width="50"></td>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>
                <input type="number" min="1" value="${item.quantity}" 
                onchange="updateQuantity('${item.name}', this.value)">
            </td>
            <td>
                <button onclick="removeProduct('${item.name}')">X</button>
            </td>
        `;

        contentProducts.appendChild(row);
    });

    total.textContent = `$${totalPrice.toFixed(2)}`;
    cartCount.textContent = totalItems;
}
function updateQuantity(name, quantity) {
    const product = cart.find(item => item.name === name);

    if (product) {
        product.quantity = parseInt(quantity);
    }

    renderCart();
}
function removeProduct(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        cart.splice(index, 1);
    }

    renderCart();
}
<p class="currentPrice">
