/* ===================== Firebase initialize ===================== */
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

/* =================== Firebase authentication =================== */
import {getAuth,  onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";

/* =================== Firebase realtime database ================== */
import {getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

/* ======================= Cloud FireStore ======================= */
import {getFirestore, query,collection, setDoc,increment, getDoc, getDocs,doc, orderBy,onSnapshot,deleteDoc} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

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

//Filter

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

  const addFunc = async () =>{
       let ner = document.getElementById("nerInput").value
       let reg =document.getElementById("regInput").value
       let utas = document.getElementById("utasInput").value
       let hayg = document.getElementById("haygInput").value
       let sale = document.getElementById("saleInput").value
       if(ner.length === 0 || reg.length === 0 || utas.length === 0 || hayg.length === 0 ){
        alert("cant be blank")
       }
       else{
      await  setDoc(doc(db, "undone","MN"+mainId),{
            Delivery:mainId,
            name: ner,
            register: reg, 
            phone: utas,  
            place:hayg,
            product:product,
            promoPro:promo,
            discount:sale,
            date: new Date(),
            hurgegch: uid
        }); 
       await setDoc(doc(db,"id","value"),{
            id:mainId
          })
          window.location.reload()
        
       }   
  }
  let urt = [];

  let nershil = [];
 const friendRef = collection(db, 'undone')
 async function all(){
    getDocs(friendRef)
    .then((snapshot) =>{
     
        snapshot.forEach((l) =>{
           
            urt.push(l.data())  
            
            let niits = [];
            let test = [];  
         
          
       
      
       l.data().product.forEach(el=>{
          niits.push([el.optionValue,el.inputValue,el.op2])
      })
     l.data().promoPro.forEach(el =>{
          test.push([el.optionValue,el.inputValue,el.op2])
      })
      //Test
      document.getElementsByClassName("cards")[0].innerHTML +=
        `
        <div class="square">
        <h2>${"MN"+l.data().Delivery}</h2>
      </div>
        `
       
        let baraaniimedee = document.getElementsByClassName("formDisplay")[0]
        
        nershil.push([`
        <div class="sub">
        
            <h2>Нэр</h2>
            <h3> ${l.data().name}</h3>
            <h2>Регистер</h2>
            <h3>${l.data().register}</h3>
            <h2>Утас</h2>
            <h3>${l.data().phone}</h3>
            <h2>Хаяг</h2>
            <h3>${l.data().place}</h3>
            <h2>Бараа</h2>
            <h3>${niits.join("<br>").replace(/,/g, " - ")}</h3>
            <h2>Хөнглөлт</h2>
            <h3>${l.data().discount}</h3>
            <h2>Урамшуулал</h2>
            <h3>${test.join("<br>").replace(/,/g, " ~ ")}</h3> 
                  
        </div>
        `
    ])
        
   
         let indexOl = 0;
      let news = document.getElementsByClassName("square");
      
      let paid = document.getElementsByClassName("paid")[0]
      let davt =0;
      for (let i = 0; i < news.length; i++) {
        // let songo = document.getElementsByClassName("sub")[i]
           
         news[i].onclick = function() {
          
         let stringBol = String(nershil[i])
         
          document.getElementsByClassName("formDisplay")[0].innerHTML =
          `
          ${stringBol}
          `
                baraaniimedee.classList.toggle("tog")
                // cols.classList.toggle("tog")
                // paid.classList.toggle("tog")
                if(davt===0 || indexOl === "a"){
                  indexOl = i;
                  davt ++; 
                  console.log(indexOl)
                  
                }
                else if(davt===1){
                 davt=0
                  indexOl = "a";
                  console.log(indexOl)
                }

                
         }
      }
    
     
         let close = document.getElementsByClassName("paid");
         let close1 = document.getElementsByClassName("cols"); 
         for (let i = 0; i < close.length; i++) {
       

            close[i].onclick = async function() {
             
               setDoc(doc(db, "done","MN"+urt[indexOl].Delivery),{
                Delivery:urt[indexOl].Delivery,
                name: urt[indexOl].name,
                register: urt[indexOl].register, 
                phone: urt[indexOl].phone,  
                place:urt[indexOl].place,
                product:urt[indexOl].product,
                promoPro:urt[indexOl].promoPro,
                discount:urt[indexOl].discount,
                date: new Date(),
                hurgegch: uid
             }); 
              deleteDoc(doc(db, "undone", "MN"+urt[indexOl].Delivery));
             
            console.log(urt[indexOl].product)
        
            for(let i = 0;i<urt[indexOl].product.length;i++){
              console.log(Object.values(urt[indexOl].product[i]))
               let test =Object.values(urt[indexOl].product[i])
              if(test.includes("Супер")){
                const validNumbers = test.filter(Number);
                const toNumbers = validNumbers.map(Number);
               console.log(toNumbers)
               await setDoc(doc(db,"storage/items"),{
                  mori: increment(-toNumbers)
                },{merge: true})
              }
              if(test.includes("Классик")){
                const validNumbers = test.filter(Number);
                const toNumbers = validNumbers.map(Number);
               console.log(toNumbers)
               await setDoc(doc(db,"storage/items"),{
                  super: increment(-toNumbers)
                },{merge: true})
              }
              if(test.includes("Гахай")){
                const validNumbers = test.filter(Number);
                const toNumbers = validNumbers.map(Number);
               console.log(toNumbers)
               await  setDoc(doc(db,"storage/items"),{
                  gahai: increment(-toNumbers)
                },{merge: true})
              }
               if(test.includes("Шахмал")){
                const validNumbers = test.filter(Number);
                const toNumbers = validNumbers.map(Number);
               console.log(toNumbers)
               await setDoc(doc(db,"storage/items"),{
                  shahmal: increment(-toNumbers)
                },{merge: true})
              }
              if(test.includes("Тахиа")){
                const validNumbers = test.filter(Number);
                const toNumbers = validNumbers.map(Number);
               console.log(toNumbers)
               await  setDoc(doc(db,"storage/items"),{
                  tahia: increment(-toNumbers)
                },{merge: true})
              }
            }
           
        window.location.reload()
         
            }
            close1[i].onclick =  function() {
             
            if(davt===1){
               davt=0
                indexOl = "a";
                console.log(indexOl)
              }
              console.log(indexOl)
              baraaniimedee.classList.remove("tog")
              
          }
         }

         
        //  for (let i = 0; i < close1.length; i++) {
            
        //  }

         }) 
       })
    .catch( err => {
        console.log(err.message)
    })
    }
 all()
    
 


