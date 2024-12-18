document.addEventListener('DOMContentLoaded', function () {
    const formContainer = document.getElementById('formContainer');
    const orderContainer = document.getElementById('orderContainer');
    const totalItemsElement = document.getElementById('total');
    const orderFormContainer = document.getElementById('orderFormContainer');
    const orderPreview = document.getElementById('orderPreview');
    const finalTotalElement = document.getElementById('finalTotal');

    // Function to update total
    function updateTotal(amount) {
        const currentTotal = parseFloat(totalItemsElement.textContent.split(' ')[0]);
        totalItemsElement.textContent = (currentTotal + amount).toFixed(2) + ' Php';
    }

    // Toggle cart message
    function toggleCartMessage() {
        if (orderContainer.childElementCount > 0) {
            document.querySelector('.cartItem').classList.add('hidden');
            document.querySelector('.place').style.display = 'inline-block';
        } else {
            document.querySelector('.cartItem').classList.remove('hidden');
            document.querySelector('.place').style.display = 'none';
        }
    }

    // Function to clear cart
    function clearCart() {
        orderContainer.innerHTML = '';
        totalItemsElement.textContent = '0.00 Php';
        toggleCartMessage();
    }

    // Function to handle form submission
    function handleFormSubmit(event, formType) {
        event.preventDefault();

        if (formType === 'product') {
            const productName = document.getElementById('productName').value;
            const quantity = parseInt(document.getElementById('quantity').value);
            const price = parseFloat(document.getElementById('price').value);
            const total = quantity * price;

            let existingOrderItem = Array.from(orderContainer.children).find(item => item.querySelector('h3').textContent === productName);

            if (existingOrderItem) {
                const existingQuantityElem = existingOrderItem.querySelector('.item-quantity');
                const existingTotalElem = existingOrderItem.querySelector('.item-total');
                let newQuantity = parseInt(existingQuantityElem.textContent) + quantity;
                existingQuantityElem.textContent = newQuantity;
                existingTotalElem.textContent = (newQuantity * price).toFixed(2);
                updateTotal(price);
            } else {
                const newOrderItem = document.createElement('div');
                newOrderItem.classList.add('order-item');
                newOrderItem.innerHTML = `
                    <div class="box">
                        <div class="img-box">
                            <img src="pictures/menu/${productName}.png" alt="${productName}">
                        </div>
                        <div class="bottom">
                            <h3>${productName}</h3>
                            <p>Quantity: <span class="item-quantity">${quantity}</span></p>
                            <p>Php <span class="item-total">${total.toFixed(2)}</span></p>
                        </div>
                    </div>
                    <div class="button-container">
                        <button class="addBtn">+</button>       
                        <button class="minusBtn">-</button>
                    </div>
                    <button class="deleteBtn">Delete</button>
                `;
                orderContainer.appendChild(newOrderItem);
                updateTotal(total);
            }

            document.getElementById('productForm').reset();
            formContainer.classList.add('hidden');
            toggleCartMessage();

        } else if (formType === 'order') {
            const customerName = document.getElementById('customerName').value;
            const customerAddress = document.getElementById('customerAddress').value;
            const customerContact = document.getElementById('customerContact').value;
            const modeOfPayment = document.getElementById('modeOfPayment').value;

            // Submit the order to the backend
            submitOrder(customerName, customerAddress, customerContact, modeOfPayment);

            document.getElementById('orderForm').reset();
            orderFormContainer.classList.add('hidden');
            
            // Clear the cart after placing the order
            clearCart();
        }
    }

    // Function to submit order
    function submitOrder(customerName, customerAddress, customerContact, modeOfPayment) {
        const cartItems = Array.from(orderContainer.children).map(item => ({
            productname: item.querySelector('h3').textContent,
            quantity: parseInt(item.querySelector('.item-quantity').textContent),
            total: parseFloat(item.querySelector('.item-total').textContent),
        }));
    
        const orderData = {
            userid: 1, // Replace with logged-in user's ID
            customername: customerName,
            customeraddress: customerAddress,
            customercontactnum: customerContact,
            modeofpayment: modeOfPayment,
            cartItems,
        };
    
        fetch('storeOrder.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Removed alert
                console.log(`Order placed successfully! Order ID: ${data.orderid}`);
            } else {
                console.log('Failed to place order. Please try again.');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Event listeners
    document.querySelectorAll('.showFormBtn').forEach(btn => {
        btn.addEventListener('click', function () {
            const productName = this.closest('.card-content').querySelector('.card-title').textContent;
            const priceText = this.closest('.card-content').querySelector('.card-price').textContent;
            const price = parseFloat(priceText.match(/([\d.]+)/)[1]).toFixed(2);

            document.getElementById('productName').value = productName;
            document.getElementById('price').value = price;
            formContainer.classList.remove('hidden');
        });
    });

    document.getElementById('closeform').addEventListener('click', function () {
        formContainer.classList.add('hidden');
    });

    document.getElementById('productForm').addEventListener('submit', function (event) {
        handleFormSubmit(event, 'product');
    });

    document.getElementById('orderContainer').addEventListener('click', function (event) {
        const orderItem = event.target.closest('.order-item');
        if (orderItem) {
            const itemQuantityElem = orderItem.querySelector('.item-quantity');
            const itemTotalElem = orderItem.querySelector('.item-total');
            const itemPrice = parseFloat(document.getElementById('price').value);

            if (event.target.classList.contains('addBtn')) {
                let quantity = parseInt(itemQuantityElem.textContent) + 1;
                itemQuantityElem.textContent = quantity;
                itemTotalElem.textContent = (quantity * itemPrice).toFixed(2);
                updateTotal(itemPrice);
            }

            if (event.target.classList.contains('minusBtn')) {
                let quantity = parseInt(itemQuantityElem.textContent);
                if (quantity > 1) {
                    quantity--;
                    itemQuantityElem.textContent = quantity;
                    itemTotalElem.textContent = (quantity * itemPrice).toFixed(2);
                    updateTotal(-itemPrice);
                }
            }

            if (event.target.classList.contains('deleteBtn')) {
                let deletedTotal = parseFloat(itemTotalElem.textContent);
                updateTotal(-deletedTotal);
                orderItem.remove();
                toggleCartMessage();
            }
        }
    });

    document.querySelector('.place').addEventListener('click', function () {
        displayOrderForm();
    });

    document.getElementById('cancelOrder').addEventListener('click', function () {
        orderFormContainer.classList.add('hidden');
    });

    document.getElementById('orderForm').addEventListener('submit', function (event) {
        handleFormSubmit(event, 'order');
    });

    function displayOrderForm() {
        orderPreview.innerHTML = '';
        let cartItems = Array.from(orderContainer.children);
        let finalTotal = 0;

        cartItems.forEach(function (item) {
            let itemName = item.querySelector('h3').textContent;
            let itemQuantity = item.querySelector('.item-quantity').textContent;
            let itemTotal = parseFloat(item.querySelector('.item-total').textContent);

            finalTotal += itemTotal;
            let previewItem = document.createElement('div');
            previewItem.innerHTML = `<p>${itemName} (x${itemQuantity}): Php ${itemTotal.toFixed(2)}</p>`;
            orderPreview.appendChild(previewItem);
        });

        finalTotalElement.textContent = finalTotal.toFixed(2) + ' Php';
        orderFormContainer.classList.remove('hidden');
    }

    // Back to Top Button
    const backToTopButton = document.createElement('button');
    backToTopButton.textContent = 'Back to Top';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Show/hide the button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
});
