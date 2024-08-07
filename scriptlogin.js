import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

window.env = {
  FIREBASE_API_KEY: "AIzaSyB7OkfM-p0VaB8m9c7dBExS9ViR-DmgMX0"
};

const firebaseConfig = {
   apiKey: window.env.FIREBASE_API_KEY,
    authDomain: "login-8405c.firebaseapp.com",
    projectId: "login-8405c",
    storageBucket: "login-8405c.appspot.com",
    messagingSenderId: "264742098294",
    appId: "1:264742098294:web:2d08cc7f3e9b67a7fad657"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'en';
  const provider = new GoogleAuthProvider();
  
  const googleBtn = document.querySelector('#googleBtn');
  const loginBtn = document.querySelector('#login');
  const username = document.querySelector('#username');
  const password = document.querySelector('#password');
  const namebox = document.querySelector('#namebox');

  
  googleBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const email = localStorage.setItem('email',user.email);
        const userStore = localStorage.setItem('userStore',JSON.stringify(result.user));
        const picture = localStorage.setItem('pic',user.picture);
        console.log(user.picture);
        
        console.log(email);
        window.location.href = '../todlist.html';

      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  });

  

  function login(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username !== '' && password.length >= 5) {
        localStorage.setItem('username', username);
        window.location.href = './todlist.html';

    } else {
        alert('your password should be at least 5 letters');
    }
}
  loginBtn.addEventListener('click',login);