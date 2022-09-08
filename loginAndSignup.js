/* ======================= Password Show Button ================== */
const passField = document.getElementsByClassName("password")[0],
    passShowHide = document.getElementsByClassName("showHidePw")[0],
    showPasswordBtn = document.getElementsByClassName("showPasswordBtn")[0];

/* ======================== Login Section ======================== */
const loginBtn = document.getElementsByClassName("loginBtn")[0],
    loginModal = document.getElementsByClassName("loginModal")[0],
    loginCloseBtn = document.getElementsByClassName("loginCloseBtn")[0],
    loginForm = document.getElementsByClassName("loginForm")[0];


/* ======================= Sign Up Section ======================= */
const signUpBtn = document.getElementsByClassName("signUpBtn")[0],
    signUpCloseBtn = document.getElementsByClassName("signUpCloseBtn")[0],
    signUpModal = document.getElementsByClassName("signUpModal")[0],
    signUpForm = document.getElementsByClassName("signUpForm")[0],
    inputFields = document.querySelectorAll(".inputFields");



/* ======================== Check Section ======================== */
let nameInput = document.getElementById("nameInput"),
    emailInput = document.getElementById("emailInput"),
    passwordInput = document.getElementById("passwordInput"),
    password2 = document.getElementById("passwordUp");

const form = document.getElementById("form1") 


function signBtn(){

}


function checkInputs() {
    let usernameValue = nameInput.value,
        emailValue = emailInput.value,
        passwordValue = passwordInput.value,
        password2Value = password2.value;
    if (usernameValue === "") {
        setError(nameInput, "Username cannot be blank");
    }else {
        setSuccess(nameInput);
    }
	if(emailValue === "") {
		setError(emailInput, 'Email address cannot be blank');
    } else if (!isEmail(emailValue)) {
        setError(emailInput, 'Имэйл биш');
    }else {
		setSuccess(emailInput);
	}
	if(passwordValue === "") {
		setError(passwordInput, 'Password cannot be blank');
	}else {
		setSuccess(passwordInput);
	}
	if(password2Value === "") {
		setError(password2, 'Confirm your password');
	}else if(passwordValue !== password2Value) {
		setError(password2, 'Password does not match');
	}else{
		setSuccess(password2);
	}
}
function setError(input, message) {
    let inputField = input.parentElement;
    let small = inputField.querySelector("small");
    inputField.className = "inputFields error";
    small.innerText = message;
}
function setSuccess(input) {
    let inputField = input.parentElement;
    inputField.className = "inputFields success";
}
function isEmail(emailInput) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput);
}

// let horLine = document.getElementsByClassName("horLine")[0];
// let verLine = document.getElementsByClassName("verLine")[0];
// for (let i = 0; i < lineAmount; i++){
//     let hrline = document.createElement("div");
//     hrline.className = "hr";
//     hrline.style.top = (distance * i) + "px";
//     horLine.appendChild(hrline);
// }
// for (let i = 0; i < lineAmount; i++){
//     let vrline = document.createElement("div");
//     vrline.className = "vr";
//     vrline.style.left = (distance * i) + "px";
//     verLine.appendChild(vrline);
// }