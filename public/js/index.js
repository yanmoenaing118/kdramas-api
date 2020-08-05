import "@babel/polyfill";

import { login } from "./auth";

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("psw").value;
    login(email, password);
  });
}

console.log("Hello from parcel");
