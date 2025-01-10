 import { menuArray as menu } from "./data.js";

 let orderItems = []
 const formEl = document.getElementById('form')
 const submit = document.getElementById('submit')

 document.addEventListener('click',  e =>{
    if(e.target.dataset.add){
        findOrder(e.target.dataset.add)
    }
    else if(e.target.id === 'complete-order'){
        document.getElementById('form-container').classList.remove('hidden')
    }
    else if(e.target.id=== 'close-btn'){
        document.getElementById('form-container').classList.add('hidden')
    }
    else if(e.target.dataset.remove){
        removeOrder(e.target.dataset.remove)
    }
 })

 submit.addEventListener('click', (e) =>{
    e.preventDefault()

    if (formEl.checkValidity()) { 
        thankyou()
        document.getElementById('name').value = ''
        document.getElementById('card-number').value = ''
        document.getElementById('cvv').value = ''
        
    } else {
        formEl.reportValidity()
    }
 })
 

 function findOrder (itemID){
    itemID = Number(itemID)
    const targetMenuObj = menu.filter(menuItem =>{
        return menuItem.id === itemID
    })[0]
    addOrder(targetMenuObj)
 }

 function addOrder(menuObject){ 
    orderItems.push(menuObject)
    renderOrder()
 }

 function addPrice (){
    console.log(orderItems)
    return orderItems.reduce((total, item)=> total+ item.price, 0)
 }

 function renderOrder(){
       let totalPrice = addPrice()
       if(document.getElementById('order-page')){
        document.getElementById('order-page').innerHTML = ''
       }
        if (orderItems.length > 0) {
            document.getElementById('checkout-page').classList.remove('hidden');
            orderItems.forEach(item => {
                document.getElementById('order-page').innerHTML += `
                    <div id="order-item-${item.id}" class="order-item">
                        <h1 class="item-name"> ${item.name} <span class="remove-btn" data-remove="${item.id}"> remove </span></h1>
                        <p class="item-price order-name"> $${item.price}</p>
                    </div>
                `;
            });
            document.getElementById('total-price-nb').textContent = `$${totalPrice}`;
        } else {
            document.getElementById('checkout-page').classList.add('hidden');
        }
 }
 
 function removeOrder (itemID){
    itemID = Number(itemID)
    const indexToRemove = orderItems.findIndex(item => item.id === itemID)

    if (indexToRemove > -1) {
        orderItems.splice(indexToRemove, 1); 
    }
    renderOrder()
 }

 function thankyou(){
    document.getElementById('form-container').classList.add('hidden')
    document.getElementById('checkout-page').innerHTML = thankyoumessage()
    document.getElementById('checkout-page').classList.remove('hidden')

 }

 function thankyoumessage(){
    const form = new FormData (formEl)
    return `
    <h1 class="thankyou-msg"> Thanks, ${form.get('name')}! Your order is on its way! </h1>
    `

 }

function getItems (){
    let message =''
    menu.forEach(item =>{
        message+= `
        <div class ="item">
            <div class="item-emoji">
                ${item.emoji}
            </div>
            <div class="item-desc">
                <h1 class="item-name"> ${item.name}</h1>
                <p class="item-ingredients"> ${item.ingredients}</p>
                <p class="item-price"> $${item.price}</p>
            </div>
            <button class="add-btn" data-add ="${item.id}"> + </button>
        </div>
        `
    })  
    return message
}

function renderItems() {
    document.getElementById('menu').innerHTML = getItems()
}

renderItems()    

