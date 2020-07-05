const carts = document.querySelectorAll('.add-cart');

const products = [
    {
        name: "Peper",
        tag: "peper",
        price: 5,
        inCart: 0
    },
    {
        name: "Apple",
        tag: "apple",
        price: 3,
        inCart: 0
    },
    {
        name: "Chili",
        tag: "chili",
        price: 8,
        inCart: 0
    },
    {
        name: "Juice",
        tag: "juice",
        price: 8,
        inCart: 0
    }
];

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

const onLoadCartNumbers = () => {
    const productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart-items').textContent = productNumbers;
    }
}

const cartNumbers = (product, action) => {
    const productNumbers = parseInt(localStorage.getItem('cartNumbers'));

    const cartItems = JSON.parse(localStorage.getItem('productsInCart'));

    if(action) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart-items').textContent = productNumbers - 1;
    } else if(productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart-items').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart-items').textContent = 1;
    }
    setItems(product);
}

const setItems = product => {
    const productNumbers = parseInt(localStorage.getItem('cartNumbers'));
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));

    if(cartItems != null) {
        const currentProduct = product.tag;

        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

const totalCost = (product, action) => {
    let cartCost = localStorage.getItem("totalCost");

    if(action) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost - product.price);
    } else if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

const displayCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('productsInCart'));

    const cartCost = parseInt(localStorage.getItem("totalCost"));
    const productContainer = document.querySelector('.products');

        if(productContainer) {
        productContainer.innerHTML = `
            <div class="empty-cart mt-4 text-center">
                <h5>You don't have any items in your cart.</h5>
                <a href="index.html#shopnow"><button class="mt-4 empty-cart-btn">Start shopping</button></a>
            </div>
        `;

        if (cartItems && productContainer) {
          productContainer.innerHTML = "";
          Object.values(cartItems).map((item) => {
            productContainer.innerHTML += `
            <div class="product col-xs-3 col-xs-pd">
                <i class="fas fa-trash-alt remove-item"></i>
                <img src="./images/${item.tag}.jpg">
                <span class="mr-4">${item.name}</span>
            </div>
            <div class="price col-xs-3 col-xs-pd">$${item.price},00</div>
            <div class="quantity col-xs-3 col-xs-pd">
                <i class="fas fa-minus decrease"></i>
                <span>${item.inCart}</span>
                <i class="fas fa-plus increase"></i>
            </div>
            <div class="total col-xs-3 col-xs-pd">
                $${item.inCart * item.price},00
            </div>`;
            });
            productContainer.innerHTML += `
            <div class="basketTotalContainer col-xs-3">
                <h4 class="basketTotalTitle>
                    Basket total
                </h4>
                <h4 class="basketTotal">
                    Your Total
                    </br></br>
                    $${cartCost},00
                </h4>`;
            deleteButtons();
            manageQuantity();
        }
    }
}

const manageQuantity = () => {
    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');

    let currentQuantity = 0;
    let currentProduct = '';

    const cartItems = JSON.parse(localStorage.getItem('productsInCart'));

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();

            if(cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));

                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
        });
    }
}

const deleteButtons = () => {
    const deleteButtons = document.querySelectorAll('.remove-item');

    const productNumbers = localStorage.getItem('cartNumbers');
    const cartCost = localStorage.getItem("totalCost");

    const cartItems = JSON.parse(localStorage.getItem('productsInCart'));

    let productName;

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();
