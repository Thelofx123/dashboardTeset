/* ===================== Firebase initialize ===================== */
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

/* =================== Firebase authentication =================== */
import {getAuth, onAuthStateChanged,createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";

/* =================== Firebase realtime database ================== */
import {getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

/* ======================= Cloud FireStore ======================= */
import {getFirestore, getDocs,collection, setDoc, getDoc, doc, onSnapshot} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAm-rFTuyMtZj6TrpRqHZEWPcSVTlpRfEQ",
    authDomain: "mimo-fddc6.firebaseapp.com",
    projectId: "mimo-fddc6",
    storageBucket: "mimo-fddc6.appspot.com",
    messagingSenderId: "862310745532",
    appId: "1:862310745532:web:07404608a78a0ac948d7b9",
    measurementId: "G-9BFNF3SL9B"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let userUid = "";

const createUser = () => {
    const email = document.getElementById("emailInput1").value;
    const password = document.getElementById("passInput2").value;
    const name = document.getElementById("nameInput").value;
    
    createUserWithEmailAndPassword(auth,email, password,)
      .then((userCredential) => {
        const userUidFromCred = userCredential.user.uid; 
         userUid = userUidFromCred;
        setDoc(doc(db, "hurgegch",userUid), {
          name: name,
          email: email, 
        });
        console.log("Account created");
        alert("Хаяг үүслээ")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
      
  };
  

      
  
        const currentUser = auth.currentUser;
        const autoSignin = () =>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
              
              } else {
                console.log("I will be back")
              }
        })
        }
        autoSignin()
     


document.getElementById("signupButton1").addEventListener("click", createUser);
