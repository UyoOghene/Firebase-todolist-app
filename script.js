
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, push, remove, } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-f6f18-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const dataBase = getDatabase(app);
const shoppingListInDB = ref(dataBase, "shoppingList");

const inputField = document.querySelector('#input-field');
const addButton = document.querySelector('#add-button');
const inputForm = document.querySelector('#add-btn-field');
const shoppingItemList = document.querySelector('#shopping-item-list');



const addToCart = (e) => {
    e.preventDefault();
    let name = prompt('Enter your name');
    let item = inputField.value;
    let user = name;
    const d = new Date();
    const date = d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    if(name !== null){
        push(shoppingListInDB, { item, user, date });
        inputField.value = '';  
    }
};

inputForm.addEventListener('submit', addToCart);

onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        let items = snapshot.val();
        shoppingItemList.innerHTML = '';

        const table = document.createElement('table');
        table.setAttribute('border', '1');
        shoppingItemList.appendChild(table);

        const headerRow = document.createElement('tr');
        const headers = ['Item', 'User', 'Date'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        Object.keys(items).forEach(key => {
            const { item, user, date } = items[key];
            const row = document.createElement('tr');
            table.appendChild(row);

            [item, user, date].forEach(text => {
                const td = document.createElement('td');
                td.textContent = text;
                row.appendChild(td);
            });

            row.addEventListener('click', function() {
                row.style.textDecoration = 'line-through';
            });

            row.addEventListener('dblclick', function() {
                const exactLocation = ref(dataBase, `shoppingList/${key}`);
                remove(exactLocation);
            });
        });
    } else {
        shoppingItemList.innerHTML = 'No item on the list yet';
    }
});
