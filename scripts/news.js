"use strict";

const newsContent = document.getElementById("news-container");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const pagesNum = document.getElementById("page-num");
let page = 1;

//Lấy thông tin setting của user
let userLogin = getFromStorage("userLogin");
let settingUser;

if (getFromStorage(`settingArr${userLogin.username}`) === null) {
  settingUser = {
    pageSize: 5,
    category: "General",
  };
} else {
  settingUser = getFromStorage(`settingArr${userLogin.username}`);
}

let renderPage = function (page) {
  newsContent.innerHTML = "";
  getNews("us", settingUser.category, settingUser.pageSize, page, APIkey);

  //Lấy dữ liệu totalResults tính toán số trang max
  let pagesOfSite = getFromStorage("pagesOfSite") / settingUser.pageSize;
  pagesOfSite = (pagesOfSite * 10) % 10 >= 5 ? pagesOfSite : pagesOfSite + 1;
  pagesOfSite = pagesOfSite.toFixed(0);

  //Hiển thị số trang
  pagesNum.innerHTML = page;

  if (page === 1) {
    prevBtn.classList.add("hidden");
  } else {
    prevBtn.classList.remove("hidden");
  }
  if (page == pagesOfSite) {
    nextBtn.classList.add("hidden");
  } else {
    nextBtn.classList.remove("hidden");
  }
};
renderPage(page);

nextBtn.addEventListener("click", function () {
  page += 1;
  renderPage(page);
});

prevBtn.addEventListener("click", function () {
  page -= 1;
  renderPage(page);
});
