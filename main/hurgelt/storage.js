/* ===================== Firebase initialize ===================== */
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

/* =================== Firebase authentication =================== */
import {getAuth,  onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";

/* =================== Firebase realtime database ================== */
import {getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

/* ======================= Cloud FireStore ======================= */
import {getFirestore, query,collection, setDoc,FieldValue, getDoc,increment, getDocs,doc, orderBy,onSnapshot,deleteDoc} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

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
async function all(){
    const docRef =getDoc(doc(db, 'storage/items'))
    .then((item) =>{
      console.log(item.data())
      document.getElementsByClassName("itemstock")[0].innerHTML =
      `
      ${item.data().super}ш
      `
      document.getElementsByClassName("itemstock1")[0].innerHTML =
      `
      ${item.data().mori}ш
      `
      document.getElementsByClassName("itemstock2")[0].innerHTML =
      `
      ${item.data().gahai}ш
      `
      document.getElementsByClassName("itemstock3")[0].innerHTML =
      `
      ${item.data().tahia}ш
      `
      document.getElementsByClassName("itemstock4")[0].innerHTML =
      `
      ${item.data().shahmal}ш
      `
     })
    
}
all()



    let button = document.getElementsByClassName("cbbtn")
    
    for(let i = 0;i<=button.length;i++){
        button[i].onclick = function(){
            console.log(i)
            document.getElementsByClassName("addProduct")[0].classList.toggle("toggleto")
            if(i===0){    
                document.getElementById("productNemeh").onclick = async function(){
                    let too = document.getElementsByClassName("tonemeh")[0].value
                    console.log(parseInt(too))
              await setDoc(doc(db,"storage/items"),{
                    super:increment(parseInt(too))
                  },{merge: true})
                  window.location.reload()
                }      
                   
            }
            if(i===1){    
                document.getElementById("productNemeh").onclick = async function(){
                    let too = document.getElementsByClassName("tonemeh")[0].value
                    console.log(parseInt(too))
              await setDoc(doc(db,"storage/items"),{
                    mori:increment(parseInt(too))
                  },{merge: true})
                  window.location.reload()
                }      
                   
            }
            if(i===2){    
                document.getElementById("productNemeh").onclick = async function(){
                    let too = document.getElementsByClassName("tonemeh")[0].value
                    console.log(parseInt(too))
              await setDoc(doc(db,"storage/items"),{
                    gahai:increment(parseInt(too))
                  },{merge: true})
                  window.location.reload()
                }      
                   
            }
            if(i===3){    
                document.getElementById("productNemeh").onclick = async function(){
                    let too = document.getElementsByClassName("tonemeh")[0].value
                    console.log(parseInt(too))
              await setDoc(doc(db,"storage/items"),{
                    tahia:increment(parseInt(too))
                  },{merge: true})
                  window.location.reload()
                }      
                   
            }
            if(i===4){    
                document.getElementById("productNemeh").onclick = async function(){
                    let too = document.getElementsByClassName("tonemeh")[0].value
                    console.log(parseInt(too))
              await setDoc(doc(db,"storage/items"),{
                    shahmal:increment(parseInt(too))
                  },{merge: true})
                  window.location.reload()
                }      
                   
            }
        }
    }

    function add(){
        
    }

console.log(product)