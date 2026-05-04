import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS6xQlT5ZJrp-4EptZ9pdBVm_cMudi8Ho",
  authDomain: "todo-list-48529.firebaseapp.com",
  projectId: "todo-list-48529",
  storageBucket: "todo-list-48529.firebasestorage.app",
  messagingSenderId: "713032707684",
  appId: "1:713032707684:web:a78d28f3ad95226ffdf971",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);