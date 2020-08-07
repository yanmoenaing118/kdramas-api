import "@babel/polyfill";

import { login, signup } from "./auth";

const loginBtn = document.getElementById("loginBtn");
const singupBtn = document.getElementById("singupBtn");
const userAccBtn = document.querySelector(".header__user");

if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("psw").value;
    login(email, password);
  });
}

if (userAccBtn) {
  userAccBtn.addEventListener("click", () => {
    location.assign("/me");
  });
}

if (singupBtn) {
  singupBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const psw = document.getElementById("psw").value;
    const pswCon = document.getElementById("pswCon").value;

    signup(name, email, psw, pswCon);
  });
}
console.log("Hello from parcel");
