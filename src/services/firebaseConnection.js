import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBwzjLY1E_EiA80tjko5ykI6gEb0_GAeuc",
  authDomain: "tickets-cb613.firebaseapp.com",
  projectId: "tickets-cb613",
  storageBucket: "tickets-cb613.firebasestorage.app",
  messagingSenderId: "322633789535",
  appId: "1:322633789535:web:e2b9b1c763197b8d56abea",
  measurementId: "G-JN6KNEYNVW"
};

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export { auth, db, storage }