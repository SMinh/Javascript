"use strict";
const searchInput = document.getElementById("input-query");
const submitBtn = document.getElementById("btn-submit");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const pagesNum = document.getElementById("page-num");
const newsContent = document.getElementById("news-container");
let page = 1;
let key = searchInput.value;
let pageSize = 5;

//Hàm get API
const getSearch = async function (page) {
  let key = searchInput.value;
  try {
    const apiKey = "d83f1f9967dd41e3b1624ce9ddef6750";
    if (key === "") {
      return alert("please input search key");
    }
    console.log(key);
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${key}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
    );
    if (!res.ok) throw new Error("Problem getting News");
    const data = await res.json();
    saveToStorage("pagesOfSearch", data.totalResults);

    //Render news
    for (let i = 0; i < data.articles.length; i++) {
      newsContent.innerHTML +=
        "<div style = 'border:1px solid ;margin:20px;display:flex;width:100%;'><img style = 'float:left; width:500px;height:100%;' src=" +
        data.articles[i].urlToImage +
        ">" +
        "<div style = 'padding :20px;'><h4>" +
        data.articles[i].title +
        "</h4>" +
        data.articles[i].description +
        "<BR><button style='background-color:#4876FF; border-radius:3px'><a style='color:white;padding:5px' href=" +
        data.articles[i].url +
        "</a>" +
        "View" +
        "</button></div></div>";
    }
  } catch (err) {
    console.error(err);
  }
};

let renderSearch = function () {
  newsContent.innerHTML = "";

  //Tính toán số trang max
  let pagesOfSearch = getFromStorage("pagesOfSite") / pageSize;
  pagesOfSearch =
    (pagesOfSearch * 10) % 10 >= 5 ? pagesOfSearch : pagesOfSearch + 1;
  pagesOfSearch = pagesOfSearch.toFixed(0);

  //Hiển thị số trang
  pagesNum.innerHTML = page;

  if (page === 1) {
    prevBtn.classList.add("hidden");
  } else {
    prevBtn.classList.remove("hidden");
  }
  if (page == pagesOfSearch) {
    nextBtn.classList.add("hidden");
  } else {
    nextBtn.classList.remove("hidden");
  }
  getSearch(page);
};

submitBtn.addEventListener("click", renderSearch);

nextBtn.addEventListener("click", function () {
  page += 1;
  renderSearch(page);
});

prevBtn.addEventListener("click", function () {
  page -= 1;
  renderSearch(page);
});
