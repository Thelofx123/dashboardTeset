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
        setDoc(doc(db, "undone","MN"+mainId),{
            Delivery:mainId,
            name: ner,
            register: reg, 
            phone: utas,  
            place:hayg,
            product:product,
            promoPro:promo,
            discount:sale
        }); 
        setDoc(doc(db,"id","value"),{
            id:mainId
          })
        
       }   
  }
  let urt = [];
  const friendRef = query(collection(db, 'done'),orderBy("date","desc"))
  function all(){
    getDocs(friendRef)
    .then((snapshot) =>{
        snapshot.forEach((l) =>{
           
            urt.push(l.data())  
            let niits = [];
            let nershil = [];  
            let hemjee = [];
            let test = [];
            let test1 = [" "];

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
            <th> <button class="paid" >Буцаах</button></th>
          </tr>
         `      
         let close = document.getElementsByClassName("paid");
         for (let i = 0; i < close.length; i++) {
             
            close[i].onclick = async function() {
                console.log(urt[i])    
              await  setDoc(doc(db, "butsaalt","MN"+urt[i].Delivery),{
                    Delivery:urt[i].Delivery,
                    name: urt[i].name,
                    register: urt[i].register, 
                    phone: urt[i].phone,  
                    place:urt[i].place,
                    product:urt[i].product,
                    promoPro:urt[i].promoPro,
                    discount:urt[i].discount
                }); 
               await deleteDoc(doc(db, "done", "MN"+urt[i].Delivery));
               window.location.reload()
            }
         }
        })
       })
    
    .catch( err => {
        console.log(err.message)
    })
 
}
 all()
    
 
 console.log(urt)
//Base Function


 






//Html function

function baraanemeh(){
   let nemeh = document.getElementsByClassName("forms")[0]
   nemeh.classList.toggle("toggle")
}

    function baraa() {
        var li = document.createElement("li");
        let a =document.createElement("a")
        let toos1 =document.createElement("p")
        let optionValue = document.getElementById("cars").value
        let inputValue = document.getElementById("baraaCount").value;
        let op2 = document.getElementById("toos").value
        var t = document.createTextNode(inputValue);
        let s = document.createTextNode(optionValue);
        let op23 = document.createTextNode(op2)
        li.appendChild(s);
      let as =  a.appendChild(t);

     let at= toos1.appendChild(op23)
        if (optionValue === '' && inputValue === '') {
          alert("You must write something!");
        } else {
          
          document.getElementById("myUL").appendChild(li);
          var span = document.createElement("SPAN");
          var span1 = document.createElement("p")
          var span2 = document.createElement("a")
          li.appendChild(span2)
          li.appendChild(span);
          li.appendChild(span1)
          span.appendChild(as)
          span1.appendChild(at)
          span2.appendChild(s)

          product.push({inputValue,optionValue,op2})
          console.log(product)
        }
        document.getElementById("cars").value = "";
        document.getElementById("baraaCount").value = "";
      
      
    }
   
function baraa1(){
    var li = document.createElement("li");
    let a =document.createElement("a")
    let toos1 =document.createElement("p")
    let optionValue = document.getElementById("cars1").value
    let inputValue = document.getElementById("baraaCount1").value;
    let op2 = document.getElementById("toos1").value
    var t = document.createTextNode(inputValue);
    let s = document.createTextNode(optionValue);
    let op23 = document.createTextNode(op2)
    li.appendChild(s);
  let as =  a.appendChild(t);

 let at= toos1.appendChild(op23)
    if (optionValue === '' && inputValue === '') {
      alert("You must write something!");
    } else {
      
      document.getElementById("myUL1").appendChild(li);
      var span = document.createElement("SPAN");
      var span1 = document.createElement("p")
      var span2 = document.createElement("a")
      li.appendChild(span2)
      li.appendChild(span);
      li.appendChild(span1)
      span.appendChild(as)
      span1.appendChild(at)
      span2.appendChild(s)
        promo.push({inputValue,optionValue,op2})
        console.log(promo)
    }
    document.getElementById("cars1").value = "";
    document.getElementById("baraaCount1").value = ""; 
}




 document.getElementById("baraas").addEventListener("click",baraa)
 document.getElementById("baraas1").addEventListener("click",baraa1)
 document.getElementById("lastB").addEventListener("click",addFunc)
