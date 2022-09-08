/* ===================== Firebase initialize ===================== */
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

/* =================== Firebase authentication =================== */
import {getAuth,  onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";

/* =================== Firebase realtime database ================== */
import {getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

/* ======================= Cloud FireStore ======================= */
import {getFirestore, collection, setDoc, getDoc, getDocs,doc, onSnapshot,deleteDoc} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

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
                console.log("My nigga cumback")
              } else {
				
				window.location.href = "../index.html";
				alert("Нэвтэрч орно уу!")  
			}
        })
        }
        autoSignin();

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
  let urt2 =[];
  const duusaagui = collection(db, 'done', )
  getDocs(duusaagui)
  .then((snapshot) =>{
	snapshot.forEach((l) =>{
		urt2.push(l.data())
	 document.getElementsByClassName("head2")[0].innerHTML =
		`
						<h2>${urt2.length}</h2>			
	 `      
 
	})
   })
 
//Data section
 const friendRef = collection(db, 'undone', )
  function all(){
    getDocs(friendRef)
    .then((snapshot) =>{
        snapshot.forEach((l) =>{
           
            urt.push(l.data())
		
         
         
            document.getElementsByClassName("head1")[0].innerHTML =
            `
							<h2>${urt.length}</h2>			
         `      
         
     
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


//  document.getElementById("baraanemeh").addEventListener("click",baraanemeh)
//  document.getElementById("baraas").addEventListener("click",baraa)
//  document.getElementById("baraas1").addEventListener("click",baraa1)
//  document.getElementById("lastB").addEventListener("click",addFunc)





// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
const sidebar = document.getElementById('sidebar');

allDropdown.forEach(item=> {
	const a = item.parentElement.querySelector('a:first-child');
	a.addEventListener('click', function (e) {
		e.preventDefault();

		if(!this.classList.contains('active')) {
			allDropdown.forEach(i=> {
				const aLink = i.parentElement.querySelector('a:first-child');

				aLink.classList.remove('active');
				i.classList.remove('show');
			})
		}

		this.classList.toggle('active');
		item.classList.toggle('show');
	})
})





// SIDEBAR COLLAPSE
const logoutBtn = document.querySelector('#logout-btn');
logoutBtn.addEventListener('click', e => {
	e.preventDefault();
	auth.signOut();
	window.localStorage.clear();
	window.location.href = "../loginAndSignup.html";
	console.log('User signed out!');
  })




const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider');
const brand =document.getElementsByClassName("brand")[0]
if(sidebar.classList.contains('hide')) {
	allSideDivider.forEach(item=> {
		item.textContent = '-'
	})
	allDropdown.forEach(item=> {
		const a = item.parentElement.querySelector('a:first-child');
		a.classList.remove('active');
		item.classList.remove('show');
	})
} else {
	allSideDivider.forEach(item=> {
		item.textContent = item.dataset.text;
	})
}

toggleSidebar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');

	if(sidebar.classList.contains('hide')) {
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})
        brand.style.display = "none" 
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
	} else {
        brand.style.display = "flex" 
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})




sidebar.addEventListener('mouseleave', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})
	}
})



sidebar.addEventListener('mouseenter', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})




// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
})




// MENU
const allMenu = document.querySelectorAll('main .content-data .head .menu');

allMenu.forEach(item=> {
	const icon = item.querySelector('.icon');
	const menuLink = item.querySelector('.menu-link');

	icon.addEventListener('click', function () {
		menuLink.classList.toggle('show');
	})
})



window.addEventListener('click', function (e) {
	if(e.target !== imgProfile) {
		if(e.target !== dropdownProfile) {
			if(dropdownProfile.classList.contains('show')) {
				dropdownProfile.classList.remove('show');
			}
		}
	}

	allMenu.forEach(item=> {
		const icon = item.querySelector('.icon');
		const menuLink = item.querySelector('.menu-link');

		if(e.target !== icon) {
			if(e.target !== menuLink) {
				if (menuLink.classList.contains('show')) {
					menuLink.classList.remove('show')
				}
			}
		}
	})
})





// PROGRESSBAR
const allProgress = document.querySelectorAll('main .card .progress');

allProgress.forEach(item=> {
	item.style.setProperty('--value', item.dataset.value)
})


//Data section




// APEXCHART
var options = {
  series: [{
  name: 'series1',
  data: [31, 40, 28, 51, 42, 109, 100]
}, {
  name: 'series2',
  data: [11, 32, 45, 32, 34, 52, 41]
}],
  chart: {
  height: 350,
  type: 'area'
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
xaxis: {
  type: 'datetime',
  categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
},
tooltip: {
  x: {
    format: 'dd/MM/yy HH:mm'
  },
},
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();