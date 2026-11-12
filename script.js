// Ateeq store: shopping cart
// The cart is kept in localStorage so it survives moving between pages.
// It is a list of items like { name: 'ورد الطائف', price: 150, quantity: 2 }.

const CART_KEY = 'cartItems';

function getCart() {
    let saved;
    try {
        saved = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (error) {
        saved = [];
    }

    // Tidy the saved list: one row per product, each with a quantity.
    // (Older versions of the site saved the same product several times.)
    const cart = [];
    saved.forEach(item => {
        if (!item || !item.name || typeof item.price !== 'number') {
            return;
        }
        const existing = cart.find(row => row.name === item.name);
        if (existing) {
            existing.quantity += item.quantity || 1;
        } else {
            cart.push({ name: item.name, price: item.price, quantity: item.quantity || 1 });
        }
    });
    return cart;
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

// Add one of a product to the cart
function addToCart(name, price) {
    const cart = getCart();
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    saveCart(cart);
}

// Add to (or take from) a product's quantity. At zero the product leaves the cart.
function changeQuantity(name, change) {
    const cart = getCart();
    const item = cart.find(row => row.name === name);
    if (!item) {
        return;
    }
    item.quantity += change;
    saveCart(cart.filter(row => row.quantity > 0));
    showCart();
}

function removeFromCart(name) {
    saveCart(getCart().filter(item => item.name !== name));
    showCart();
}

// The small number next to "سلة التسوق" in the menu
function updateCartCount() {
    const badge = document.getElementById('cart-count');
    if (!badge) {
        return;
    }
    const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = count;
    badge.hidden = count === 0;
}

// Small helper to build a button
function makeButton(label, accessibleName, className, onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.className = className;
    button.setAttribute('aria-label', accessibleName);
    button.addEventListener('click', onClick);
    return button;
}

// Draw the cart rows and total on the cart page
function showCart() {
    const list = document.getElementById('cart-items');
    if (!list) {
        return; // Not on the cart page
    }

    const cart = getCart();
    list.innerHTML = '';

    cart.forEach(item => {
        const row = document.createElement('li');
        row.className = 'cart-item';

        const name = document.createElement('span');
        name.className = 'cart-item-name';
        name.textContent = item.name;

        const quantity = document.createElement('div');
        quantity.className = 'quantity';
        const amount = document.createElement('span');
        amount.className = 'quantity-amount';
        amount.textContent = item.quantity;
        quantity.append(
            makeButton('+', `زيادة كمية ${item.name}`, 'quantity-button', () => changeQuantity(item.name, 1)),
            amount,
            makeButton('−', `تقليل كمية ${item.name}`, 'quantity-button', () => changeQuantity(item.name, -1))
        );

        const price = document.createElement('span');
        price.className = 'cart-item-price';
        price.textContent = `${item.price * item.quantity} ريال`;

        const remove = makeButton('حذف', `حذف ${item.name} من السلة`, 'remove-button', () => removeFromCart(item.name));

        row.append(name, quantity, price, remove);
        list.appendChild(row);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total-price').textContent = `المجموع: ${total} ريال`;
    document.getElementById('cart-empty').hidden = cart.length > 0;
    document.getElementById('checkout-button').disabled = cart.length === 0;
}

// This is a concept store, so checkout only empties the cart and says thank you
function checkout() {
    if (getCart().length === 0) {
        return;
    }
    saveCart([]);
    showCart();
    document.getElementById('cart-empty').hidden = true;
    document.getElementById('thank-you-msg').hidden = false;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    showCart();

    // "أضف إلى السلة" buttons on the shop page
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            addToCart(button.dataset.name, Number(button.dataset.price));

            // Let the customer know the product was added
            const originalText = button.textContent;
            button.textContent = 'تمت الإضافة ✓';
            button.disabled = true;
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 1200);
        });
    });

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', checkout);
    }
});
