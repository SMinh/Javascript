"use strict";

const firstnameInput = document.getElementById("input-firstname");
const lastnameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordConfirmInput = document.getElementById("input-password-confirm");
const submitBtn = document.getElementById("btn-submit");

let checkUsername = 0;

if (getFromStorage("userData") === null) {
  userArr = [];
} else {
  userArr = getFromStorage("userData");
}
console.log(userArr);
//Hàm tạo data user
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );
  return user;
}

//Reset value
function resetValue() {}

//Hàm đăng ký user
submitBtn.addEventListener("click", function () {
  const data = {
    firstname: firstnameInput.value,
    lastname: lastnameInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
    passwordConfirm: passwordConfirmInput.value,
  };

  // else if (data.username === userArr.username) {
  //   alert("Username had valided");
  // }

  for (let i = 0; i < userArr.length; i++) {
    if (data.username === userArr[i].username) checkUsername++;
  }
  if (checkUsername) {
    console.log(usernameInput.value);
    alert("Username had valided");
    checkUsername--;
  } else if (data.firstname === "") {
    alert("Please input Firstname");
  } else if (data.lastname === "") {
    alert("Please input Lastname");
  } else if (data.username === "") {
    alert("Please input Lastname");
  } else if (data.password === "") {
    alert("Please input Password");
  } else if (data.password.length < 9) {
    alert("Password have to more than 8 character");
  } else if (data.passwordConfirm === "") {
    alert("Please input Password Confirm");
  } else if (data.passwordConfirm !== data.password) {
    alert("Password Confirm is wronged");
  } else {
    userArr.push(parseUser(data));
    saveToStorage("userData", userArr);
    firstnameInput.value = "";
    lastnameInput.value = "";
    usernameInput.value = "";
    passwordInput.value = "";
    passwordConfirmInput.value = "";
  }
});
