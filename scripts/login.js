"use strict";

const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const submitBtn = document.getElementById("btn-submit");

let userLogin;

//Đăng nhập user
submitBtn.addEventListener("click", function () {
  const data = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  if (data.username === "") {
    alert("Please input Lastname");
  } else if (data.password === "") {
    alert("Please input Password");
  } else {
    [userLogin] = getFromStorage("userData").filter(
      (e) => e.username === data.username
    );
  }
  if (data.password === userLogin.password) {
    saveToStorage("userLogin", userLogin);
    console.log(userLogin);
    window.location = "../index.html";
  } else {
    alert("Wrong password");
  }
});
