"use strict";

const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");
const submitBtn = document.getElementById("btn-submit");

let userLogin = getFromStorage("userLogin");
console.log(userLogin);

submitBtn.addEventListener("click", function () {
  const data = {
    username: userLogin.username,
    pageSize: pageSizeInput.value,
    category: categoryInput.value,
  };
  if (pageSizeInput.value === "") {
    data.pageSize = 5;
  } else {
    data.pageSize = pageSizeInput.value;
  }
  removeFromStorage(`settingArr${userLogin.username}`);
  saveToStorage(`settingArr${userLogin.username}`, data);
  console.log(getFromStorage(`settingArr${userLogin.username}`));
  window.location = "./news.html";
});
