const inputField = document.querySelector('#input-field');
const addButton = document.querySelector('#add-button');
const inputForm = document.querySelector('#add-btn-field');
const shoppingItemList = document.querySelector('#shopping-item-list');


const addToCart = (e) => {
    e.preventDefault();
    console.log(inputField.value);  
    const shoppingItem = document.createElement('p');
    shoppingItem.setAttribute('id','shoppingItemP');
    shoppingItemList.appendChild(shoppingItem);
    shoppingItem.innerText = inputField.value;   
    inputField.value = ''; 

}

inputForm.addEventListener('submit', addToCart);
