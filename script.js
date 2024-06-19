import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref , push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-f6f18-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const dataBase = getDatabase(app);
const shoppingListInDB = ref(dataBase, "shoppingList")


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
    push(shoppingListInDB , inputField.value)
    inputField.value = ''; 

}

inputForm.addEventListener('submit', addToCart);
