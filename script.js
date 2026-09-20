// ==========================================
// PRODUCT LIST WITH CART
// ==========================================


// ==========================================
// DOM ELEMENTS
// ==========================================

const productElements = document.querySelectorAll(".product");
const cartContent = document.querySelector(".cart-content");


// ==========================================
// CART STATE
// ==========================================

let cartItems = [];


// ==========================================
// INITIALIZE APPLICATION
// ==========================================

function init() {
    setupAddToCartButtons();
    renderCart();
}


// ==========================================
// ADD TO CART BUTTONS
// ==========================================

function setupAddToCartButtons() {

    productElements.forEach((product) => {

        const button = product.querySelector(".add-to-cart");

        button.addEventListener("click", () => {
            addProductToCart(product);
        });

    });
}


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addProductToCart(product) {

    const productData = getProductData(product);

    const existingItem = cartItems.find(
        (item) => item.name === productData.name
    );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cartItems.push({
            ...productData,
            quantity: 1
        });

    }

    renderCart();
}


// ==========================================
// GET PRODUCT DATA
// ==========================================

function getProductData(product) {

    const name = product
        .querySelector("h2")
        .textContent
        .trim();

    const category = product
        .querySelector(".category")
        .textContent
        .trim();

    const price = parseFloat(
        product
            .querySelector(".price")
            .textContent
            .replace("$", "")
    );

    const image = product
        .querySelector(".product-image img")
        .src;

    return {
        name,
        category,
        price,
        image
    };
}


// ==========================================
// RENDER CART
// ==========================================

function renderCart() {

    cartContent.innerHTML = "";

    // Empty cart
    if (cartItems.length === 0) {

        renderEmptyCart();

        return;
    }

    renderCartItems();
    renderOrderSummary();
}


// ==========================================
// EMPTY CART
// ==========================================

function renderEmptyCart() {

    const emptyMessage = document.createElement("p");

    emptyMessage.textContent =
        "Your added items will appear here";

    cartContent.appendChild(emptyMessage);
}


// ==========================================
// RENDER CART ITEMS
// ==========================================

function renderCartItems() {

    const itemsContainer = document.createElement("div");

    itemsContainer.className = "cart-items";

    cartItems.forEach((item, index) => {

        const cartItem = createCartItem(item, index);

        itemsContainer.appendChild(cartItem);

    });

    cartContent.appendChild(itemsContainer);

    setupQuantityButtons();
    setupRemoveButtons();
}


// ==========================================
// CREATE CART ITEM
// ==========================================

function createCartItem(item, index) {

    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    const itemTotal = item.price * item.quantity;

    cartItem.innerHTML = `

        <div class="cart-item-details">

            <h3>${item.name}</h3>

            <div class="cart-item-price">

                <span class="quantity">
                    ${item.quantity}x
                </span>

                <span>
                    @ $${item.price.toFixed(2)}
                </span>

                <strong>
                    $${itemTotal.toFixed(2)}
                </strong>

            </div>


            <!-- QUANTITY CONTROLS -->

            <div class="quantity-controls">

                <button
                    class="quantity-btn decrease"
                    data-index="${index}"
                    aria-label="Decrease quantity"
                >
                    −
                </button>

                <span class="quantity-number">
                    ${item.quantity}
                </span>

                <button
                    class="quantity-btn increase"
                    data-index="${index}"
                    aria-label="Increase quantity"
                >
                    +
                </button>

            </div>

        </div>


        <!-- REMOVE BUTTON -->

        <button
            class="remove-item"
            data-index="${index}"
            aria-label="Remove ${item.name}"
        >
            ×
        </button>

    `;

    return cartItem;
}


// ==========================================
// QUANTITY BUTTONS
// ==========================================

function setupQuantityButtons() {

    const increaseButtons =
        document.querySelectorAll(".increase");

    const decreaseButtons =
        document.querySelectorAll(".decrease");


    // PLUS BUTTON
    increaseButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            increaseQuantity(index);

        });

    });


    // MINUS BUTTON
    decreaseButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            decreaseQuantity(index);

        });

    });
}


// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseQuantity(index) {

    cartItems[index].quantity += 1;

    renderCart();
}


// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQuantity(index) {

    if (cartItems[index].quantity > 1) {

        cartItems[index].quantity -= 1;

    } else {

        cartItems.splice(index, 1);
    }

    renderCart();
}


// ==========================================
// REMOVE BUTTONS
// ==========================================

function setupRemoveButtons() {

    const removeButtons =
        document.querySelectorAll(".remove-item");

    removeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            removeProduct(index);

        });

    });
}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeProduct(index) {

    cartItems.splice(index, 1);

    renderCart();
}


// ==========================================
// ORDER SUMMARY
// ==========================================

function renderOrderSummary() {

    const total = calculateCartTotal();

    const summary = document.createElement("div");

    summary.className = "cart-summary";

    summary.innerHTML = `

        <div class="order-total">

            <span>Order Total</span>

            <strong>
                $${total.toFixed(2)}
            </strong>

        </div>


        <div class="carbon-neutral">

            <span>🌿</span>

            <p>
                This is a
                <strong>carbon-neutral</strong>
                delivery
            </p>

        </div>


        <button class="confirm-order">
            Confirm Order
        </button>

    `;

    cartContent.appendChild(summary);
}


// ==========================================
// CALCULATE CART TOTAL
// ==========================================

function calculateCartTotal() {

    return cartItems.reduce(
        (total, item) => {
            return total + item.price * item.quantity;
        },
        0
    );
}


// ==========================================
// START APPLICATION
// ==========================================

init();