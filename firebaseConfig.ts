// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC9788uJUFhyMqFzeKbvwrUi50p1Yj311w",
  authDomain: "monefyapp-c16c3.firebaseapp.com",
  databaseURL: "https://monefyapp-c16c3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "monefyapp-c16c3",
  storageBucket: "monefyapp-c16c3.appspot.com",
  messagingSenderId: "1022753351364",
  appId: "1:1022753351364:web:061cfd9a8a02214551cb91",
  measurementId: "G-DVYHYW9FLQ"
};

// Initialize Firebase
// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);