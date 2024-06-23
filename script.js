import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref , onValue , push , remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-f6f18-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const dataBase = getDatabase(app);
const shoppingListInDB = ref(dataBase, "shoppingList");


const inputField = document.querySelector('#input-field');
const addButton = document.querySelector('#add-button');
const inputForm = document.querySelector('#add-btn-field');
const shoppingItemList = document.querySelector('#shopping-item-list');


const addToCart = (e) => {
    e.preventDefault();
    const shoppingItem = document.createElement('p');
    shoppingItem.setAttribute('id','shoppingItemP');
    shoppingItemList.appendChild(shoppingItem);
    shoppingItem.innerText = inputField.value;  
    push(shoppingListInDB , inputField.value);
    inputField.value = '';  
}

inputForm.addEventListener('submit', addToCart);

onValue(shoppingListInDB, function(snapshot){
    let ArrayList = Object.values(snapshot.val());
    let items = snapshot.val();
    let itemIdList = Object.keys(items);
    console.log(items);
    console.log(itemIdList);
 
    shoppingItemList.innerHTML = '';
    for(let i=0; i< ArrayList.length; i++){
        const shoppingItem = document.createElement('p');
        shoppingItem.setAttribute('id','shoppingItemP');
        shoppingItemList.appendChild(shoppingItem);
        shoppingItem.innerText = ArrayList[i]; 

        const itemId = itemIdList[i];
        let exactlocation = ref(dataBase, `shoppingList/${itemId}`);

        shoppingItem.addEventListener('click',function(){
            shoppingItem.style.textDecoration = 'line-through';
            console.log('remove');
        })

        shoppingItem.addEventListener('dblclick',function(){
            remove(exactlocation);
            console.log('remove');
        })
    }
})

// // challenge (object to array)
// // 1:Create a variable called scrimbausersemail and use one of the object methods to set it to an array with the values
// // 2: Create a variable called scrimba userids ans use one of the Object methods to set it equal to an array with the keys
// // 3: create a let variable called scrimbauserEntries and use one of the object methods to set it equal to an arrahy with both the keys and values

// // 1
// // let scrimbaUsers = {
// //     'uyo' : "uyo@gmail.com",
// //     'james' : "james@yahoo.com",
// //     'kaka' : "kaka@outlook.com"
// // };

// // let scrimbausersemail = Object.values(scrimbaUsers);
// // console.log(scrimbausersemail);

// // // 2
// // let scrimbaUsersIds = Object.keys(scrimbaUsers);
// // console.log(scrimbaUsersIds);

// // // 3
// // let scrimbauserEntries = Object.entries(scrimbaUsers);
// // console.log(scrimbauserEntries);

