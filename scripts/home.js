"use strict";

const welcomeMsg = document.getElementById("welcome-message");
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const logoutBtn = document.getElementById("btn-logout");

let login = getFromStorage("userLogin");
if (login) {
  welcomeMsg.innerHTML = `Welcome ${login.username}`;
  loginModal.classList.add("hidden");
  mainContent.classList.remove("hidden");
} else {
  loginModal.classList.remove("hidden");
  mainContent.classList.add("hidden");
}

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("userLogin");
  console.log("click");
  console.log("localStorage");
  window.location = "../index.html";
});
