// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCa74Mu0tEBvBGiDcow2vFUeYCxZ2KPdGU",
  authDomain: "postmanager-hw.firebaseapp.com",
  projectId: "postmanager-hw",
  storageBucket: "postmanager-hw.appspot.com",
  messagingSenderId: "278899920577",
  appId: "1:278899920577:web:b66fcf45cba11953d9ce40",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
