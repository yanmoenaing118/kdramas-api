import "@babel/polyfill";

import { login, signup, logout } from "./auth";
import { postComment } from "./comment";

const loginBtn = document.getElementById("loginBtn");
const singupBtn = document.getElementById("singupBtn");
const userAccBtn = document.querySelector(".header__user");
const postCmtBtn = document.querySelector(".btn--comment");
const logoutBtn = document.getElementById("logoutBtn");

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

if (postCmtBtn) {
  postCmtBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const cmt = document.querySelector(".comment-input").value;

    // console.log(cmt, e.target.value);

    postComment(cmt, e.target.value);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
}
