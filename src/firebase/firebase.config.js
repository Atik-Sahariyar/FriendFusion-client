// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAfx7IyPh-s1NKNhSK5Z8T8DYmYvhM_xsM",
//   authDomain: "friend-fusion-22533.firebaseapp.com",
//   projectId: "friend-fusion-22533",
//   storageBucket: "friend-fusion-22533.appspot.com",
//   messagingSenderId: "213406418819",
//   appId: "1:213406418819:web:f97c0f8117edfdb67d18b6",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app