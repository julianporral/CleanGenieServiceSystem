import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import { collection, query, where, doc, getDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAew3DO6g1lPQ9j_zw9WMOTCLNDd_oKy3g",
  authDomain: "auth-7cf5b.firebaseapp.com",
  projectId: "auth-7cf5b",
  storageBucket: "auth-7cf5b.appspot.com",
  messagingSenderId: "945510619330",
  appId: "1:945510619330:web:98f016067089a8e245835b",
  measurementId: "G-QE9MZ0H0SK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

const getUserDetails = async () => {
  const uid = auth.currentUser.uid;
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  
  if(docSnap.exists()){
    const user = docSnap.data()
    return {
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    }
  }else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
export { auth, db, getUserDetails }; // Export Firestore instance