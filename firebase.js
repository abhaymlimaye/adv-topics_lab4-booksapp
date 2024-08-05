import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAyjyZxz1YNT6VB5XbwE-ejgcydRDInjFg",
    authDomain: "bookappreact-f129e.firebaseapp.com",
    projectId: "bookappreact-f129e",
    storageBucket: "bookappreact-f129e.appspot.com",
    messagingSenderId: "1014610637998",
    appId: "1:1014610637998:web:36115e4c89b4f39e36e93f",
    measurementId: "G-XJKMYCS5L3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

export { firestore, collection, addDoc, deleteDoc, doc, getDocs, serverTimestamp };
