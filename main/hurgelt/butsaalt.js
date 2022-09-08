/* ===================== Firebase initialize ===================== */
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

/* =================== Firebase authentication =================== */
import {getAuth,  onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";

/* =================== Firebase realtime database ================== */
import {getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

/* ======================= Cloud FireStore ======================= */
import {getFirestore, collection, setDoc, getDoc, getDocs,doc, orderBy,query,onSnapshot,deleteDoc} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

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
  
  
  const idcode = doc(db,"id/value");
  let docSnap = await getDoc(idcode);
  const deliveryId = docSnap.data();
 let mainId = parseInt(deliveryId.id)+1;
  console.log(mainId)
  
  //refs
 let inputFields = document.querySelectorAll("input");
  let product =[];
  let promo = [];

  let uid;
//Auto
  const currentUser = auth.currentUser;
        const autoSignin = () =>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                uid = user.uid;
              } else {
                window.location.href = "../index.html";
				alert("Нэвтэрч орно уу!")  
              }
        })
        }
        autoSignin();
        const logoutBtn = document.querySelector('#logout-btn');
        logoutBtn.addEventListener('click', e => {
          e.preventDefault();
          auth.signOut();
          window.localStorage.clear();
          window.location.href = "/index.html";
          console.log('User signed out!');
          })
        


//Filter
  
  let urt = [];
  const friendRef = query(collection(db, 'butsaalt'))
  function all(){
    getDocs(friendRef)
    .then((snapshot) =>{
        snapshot.forEach((l) =>{
           
            urt.push(l.data())  
            let niits = [];
            let test = [];
           

            l.data().product.forEach(el=>{
                test.push([el.optionValue,el.inputValue,el.op2])
            })
            l.data().promoPro.forEach(el =>{
                niits.push([el.optionValue,el.inputValue,el.op2])
            })

         
            document.getElementsByClassName("niitH")[0].innerHTML +=
            `
            <tr>
                      
            <th>MN${l.data().Delivery}</th>
            <th>${l.data().name}</th>
            <th>${l.data().register}</th>
            <th>${l.data().phone}</th>
            <th>${l.data().place}</th>
            <th class="alba">${test.join("<br>").replace(/,/g, " - ")}</th>
            <th>${l.data().discount}</th>
            <th class="alba">${niits.join("<br>").replace(/,/g, " ~ ")}</th>
           
          </tr>
         `      
        
        })
       })
    
    .catch( err => {
        console.log(err.message)
    })
 
}
 all()
    
 


 


