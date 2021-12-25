import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js"

// In real projects, this would be stored in the config file
const firebaseConfig = {
  apiKey: "AIzaSyCPW6K7Qcobj4wE1a76qPy6AgCgoFcojU0",
  authDomain: "asignment-1-5e192.firebaseapp.com",
  projectId: "asignment-1-5e192",
  storageBucket: "asignment-1-5e192.appspot.com",
  messagingSenderId: "744614226672",
  appId: "1:744614226672:web:45713f0ce9bea1cd3e3035"
}

// Initialize Firebase

const firebase = initializeApp(firebaseConfig)

export default firebase