let totalPrice = 0;

// Function to add a product to the cart
function addToCart(productName, price) {
    // Create an object to represent the product
    const product = { name: productName, price: price };
    // Get the existing cart items from local storage or create an empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Add the product to the cart items array
    cartItems.push(product);
    // Store the updated cart items back in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    // Retrieve cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    storedCartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} ريال`;
        cartItems.appendChild(li);
    });
    // Calculate and display the total price
    totalPrice = storedCartItems.reduce((total, item) => total + item.price, 0);
    document.getElementById('total-price').textContent = `المجموع: ${totalPrice} ريال`;
}

// Function to handle the checkout process
function checkout() {
    alert('شكرًا لكم على شرائكم من متجر عتيق. ستتلقون إيصال الشراء في بريدكم الإلكتروني قريبًا!');
    // Clear the cart items from local storage
    localStorage.removeItem('cartItems');
    // Update the cart display
    updateCart();
}

// Function to toggle the visibility of the cart
function toggleCart() {
    const cartDiv = document.getElementById('cart');
    if (cartDiv.style.display === 'none' || cartDiv.style.display === '') {
        cartDiv.style.display = 'block';
    } else {
        cartDiv.style.display = 'none';
    }
}


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("header").style.height = "60px"; /* Set smaller height when scrolling down */
  } else {
    document.getElementById("header").style.height = "120px"; /* Set default height when scrolling back to top */
  }
}
