// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNTCQIrpzbpqTURx65x2DhX1eHJ8zefSQ",
  authDomain: "betawith-you.firebaseapp.com",
  projectId: "betawith-you",
  storageBucket: "betawith-you.appspot.com",
  messagingSenderId: "299961864009",
  appId: "1:299961864009:web:a1c7da84dabb3bb457d498",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
