"use strict";

const APIkey = "d83f1f9967dd41e3b1624ce9ddef6750";
let userArr = [];
let todoArr = [];

//Tạo class User
class User {
  constructor(firstname, lastname, username, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
  }
}

//Tạo class TodoList
class Todo {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

//Tạo class setting
class Setting {
  constructor(username, pageSize, category) {
    this.username = username;
    this.pageSize = pageSize;
    this.category = category;
  }
}

//Hàm get API
const getNews = async function (country, category, pageSize, page, apiKey) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
    );
    if (!res.ok) throw new Error("Problem getting News");
    const data = await res.json();
    saveToStorage("pagesOfSite", data.totalResults);

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
