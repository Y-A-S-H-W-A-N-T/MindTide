import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage'

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: "xchange-99d63.appspot.com",
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

const app = initializeApp(firebaseConfig)
  
export const storage = getStorage(app)
export const db = getFirestore(app)