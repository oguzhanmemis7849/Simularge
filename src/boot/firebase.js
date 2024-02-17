// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBckcBkNZtityRgmHlhq46Opn8AVtIUNz8",
    authDomain: "simularge-case.firebaseapp.com",
    projectId: "simularge-case",
    storageBucket: "simularge-case.appspot.com",
    messagingSenderId: "145933689230",
    appId: "1:145933689230:web:44f86e5b2e60c1c61a44df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };