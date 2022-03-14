import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAkZPpB1CetWthYL14qynLpgrnBsfPsOdQ",
  authDomain: "isipcoffee.firebaseapp.com",
  projectId: "isipcoffee",
  storageBucket: "isipcoffee.appspot.com",
  messagingSenderId: "516256938912",
  appId: "1:516256938912:web:026512e5773aa5fcf182c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export default app;
