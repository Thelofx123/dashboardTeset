/* ===================== Firebase initialize ===================== */
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

/* =================== Firebase authentication =================== */
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";

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


  
  const loginUser = () => {
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passInput").value;
    const hurgegch = collection(db,"hurgegch")
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        getDocs(hurgegch)
        .then((onSnapshot) =>{
          onSnapshot.forEach((l) =>{
            console.log(l.data().email)
            if(email == l.data().email){
              userUid = userCredential.user.uid;
              console.log("amjilttai newterlee uid= ", userUid);
              window.localStorage.setItem("currentUser", userUid);
              window.location.href = "./main/hurgelt/tusgai.html";
            }
            else{
              userUid = userCredential.user.uid;
              console.log("amjilttai newterlee uid= ", userUid);
              window.localStorage.setItem("currentUser", userUid);
              window.location.href = "./main/index.html";
            }
          })
        })
          

        })
      
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        
      });
  };
   
  

document.getElementById("loginButton").addEventListener("click", loginUser);

