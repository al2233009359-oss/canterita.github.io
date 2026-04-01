const ListProducts=document.quertySelector("listProducts") 
documento.addEventListener("DOMContentLoaded", function() {
 eventlistener() ;
}) ;
function eventListener() {
    listProducts.addEventListener("click", getDataElements) ;
} 
función getDataElements(e) {
    if (e.target.classList.contains("btn-add"){ 
    consol.log(e.target);
    } 
} 
const cart = [];
const cartCount = document.getElementById("cartCount");
const contentProducts = document.getElementById("contentProducts");
const total = document.getElementById("total");
const buttons = document.querySelectorAll(".btn-add");

buttons.forEach(button => {
    button.addEventListener("click", addToCart);
});
function updateQuantity(id, quantity) {
    const product = cart.find(item => item.id === id);

    if (product) {
        product.quantity = parseInt(quantity);
    }

    renderCart();
}

function removeProduct(id) {
    const index = cart.findIndex(item => item.id === id);

    if (index !== -1) {
        cart.splice(index, 1);
    }

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
