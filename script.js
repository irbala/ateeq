// The cart is kept in localStorage so it survives moving between pages
function getCart() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

function saveCart(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to add a product to the cart
function addToCart(productName, price, button) {
    const cartItems = getCart();
    cartItems.push({ name: productName, price: price });
    saveCart(cartItems);

    // Let the customer know the product was added
    if (button) {
        const originalText = button.textContent;
        button.textContent = 'تمت الإضافة ✓';
        button.disabled = true;
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    }
}

// Function to show the cart items and total on the cart page
function updateCart() {
    const cartList = document.getElementById('cart-items');
    if (!cartList) {
        return; // Not on the cart page
    }

    const cartItems = getCart();
    cartList.innerHTML = '';

    if (cartItems.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'السلة فارغة';
        cartList.appendChild(li);
    }

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} ريال`;
        cartList.appendChild(li);
    });

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    const totalElement = document.getElementById('total-price');
    if (totalElement) {
        totalElement.textContent = `المجموع: ${totalPrice} ريال`;
    }

    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
        checkoutButton.disabled = cartItems.length === 0;
    }
}

// Function to handle the checkout process
function checkout() {
    if (getCart().length === 0) {
        return;
    }
    localStorage.removeItem('cartItems');
    updateCart();

    const thankYouMessage = document.getElementById('thank-you-msg');
    if (thankYouMessage) {
        thankYouMessage.hidden = false;
    }
}

document.addEventListener('DOMContentLoaded', updateCart);


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("header").style.height = "60px"; /* Set smaller height when scrolling down */
  } else {
    document.getElementById("header").style.height = "120px"; /* Set default height when scrolling back to top */
  }
}
