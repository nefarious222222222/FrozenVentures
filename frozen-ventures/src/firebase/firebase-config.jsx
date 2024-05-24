import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA2otnKe1rsHr1m5u3WuGzye4T5Q374gSs",
  authDomain: "frozen-ventures.firebaseapp.com",
  databaseURL: "https://frozen-ventures-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "frozen-ventures",
  storageBucket: "frozen-ventures.appspot.com",
  messagingSenderId: "320572026204",
  appId: "1:320572026204:web:6e86d5dc30aff3f8bf6599"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const realtimeDb = getDatabase(app);

export { app, auth, realtimeDb };