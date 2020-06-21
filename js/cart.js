let carts = document.querySelectorAll('.add-cart');
let cartContent = document.querySelector('.products');
let products = [
    {
        name: 'Peper',
        tag: 'peperItem',
        price: 15,
        inCart: 0,
        "id": "1"
    },
    {
        name: 'Strawberries',
        tag: 'strawberriesItem',
        price: 10,
        inCart: 0,
        "id": "2"
    },
    {
        name: 'Green Beans',
        tag: 'greenBeansItem',
        price: 5,
        inCart: 0,
        "id": "3"
    },
    {
        name: 'Juice',
        tag: 'juiceItem',
        price: 20,
        inCart: 0,
        "id": "4"
    }
];

for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', ()=> {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart-items').textContent = productNumbers;
    }
}
function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.cart-items').textContent = productNumbers+1;
    } else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart-items').textContent = 1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else{
        product.inCart = 1;
        cartItems = {
            [product.tag] : product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    }else {
        localStorage.setItem('totalCost', product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product col-xs-3 col-xs-pd">
                <i class="fas fa-trash-alt remove-item"></i>
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price col-xs-3 col-xs-pd">$${item.price},00</div>
            <div class="quantity col-xs-3 col-xs-pd">
                <i class="fas fa-minus minus-item"></i>
                <span>${item.inCart}</span>
                <i class="fas fa-plus plus-item"></i>
            </div>
            <div class="total col-xs-3 col-xs-pd">
                $${item.inCart * item.price},00
            </div>
            `
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
            </h4>
        ` 
    }
}
onLoadCartNumbers();
displayCart();


