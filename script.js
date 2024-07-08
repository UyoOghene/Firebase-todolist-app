
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, push, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
const namebox = document.querySelector('#namebox');
const picturebox = document.querySelector('#namebox');
const imgbox = document.querySelector('#imgbox');
const logoutBtn = document.querySelector('#logoutBtn');



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
        push(shoppingListInDB, { item, user, date, completed: false });
        inputField.value = '';  
    }
};

inputForm.addEventListener('submit', addToCart);

const onGoogleLogin = () => {
    let emailRetrieved = localStorage.getItem('email');
    if (emailRetrieved) {
        namebox.innerHTML = emailRetrieved;
        console.log(emailRetrieved);
        const userRetrieved = localStorage.getItem('userStore');
        let picRetrieved = JSON.parse(userRetrieved).photoURL
        console.log(picRetrieved)
        console.log(JSON.parse(userRetrieved).displayName)
        imgbox.setAttribute('src', picRetrieved)



  
    }
};

const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    window.location.href = './index.html';
}; 

logoutBtn.addEventListener('click', logout);
onGoogleLogin();

const onLogin = () => {
    let userNameretieved = localStorage.getItem('username');
    if (userNameretieved) {
        console.log('login');
        console.log(userNameretieved);
        namebox.innerHTML = userNameretieved;
    }
};

onLogin();

onValue(shoppingListInDB, function(snapshot){
    if (snapshot.exists()) {
        let items = snapshot.val();
        shoppingItemList.innerHTML = '';
        const table = document.createElement('table');
        table.setAttribute('border', '1');
        table.setAttribute('id', 'table');
        shoppingItemList.appendChild(table);
        const headerRow = document.createElement('tr');
        headerRow.setAttribute('id', 'headerRow');

        const headers = ['Item', 'User', 'Date'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.setAttribute('id', 'th');

            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        Object.keys(items).forEach(key => {
            const { item, user, date, completed } = items[key];
            const row = document.createElement('tr');
            row.setAttribute('id', 'row');

            table.appendChild(row);

            [item, user, date].forEach(text => {
                const td = document.createElement('td');
                td.setAttribute('id', 'td');

                td.textContent = text;
                row.appendChild(td);
            });

            if (completed) {
                row.style.textDecoration = 'line-through';
            }

            row.addEventListener('click', function() {
                const exactLocation = ref(dataBase, `shoppingList/${key}`);
                const newCompletedState = !completed;
                update(exactLocation, { completed: newCompletedState });
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
