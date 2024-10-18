import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlH8nhXg_FmYg5Fgp4NitY7eVRPXUtYMc",
  authDomain: "e-commerce-7a4d2.firebaseapp.com",
  projectId: "e-commerce-7a4d2",
  storageBucket: "e-commerce-7a4d2.appspot.com",
  messagingSenderId: "550673564265",
  appId: "1:550673564265:web:1a4be2ba18f9915da758f8",
  measurementId: "G-7Q6FFTB3X2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};
