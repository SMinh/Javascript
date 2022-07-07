"use strict";

function saveToStorage(key, value) {
  if (typeof Storage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    document.getElementById("content").innerHTML =
      "Sorry, your browser does not support web storage...";
  }
}

function getFromStorage(key) {
  if (typeof Storage !== "undefined") {
    const result = JSON.parse(localStorage.getItem(key));
    return result;
  } else {
    document.getElementById("content").innerHTML =
      "Sorry, your browser does not support web storage...";
  }
}

function removeFromStorage(key) {
  if (typeof Storage !== "undefined") {
    localStorage.removeItem(key);
  } else {
    document.getElementById("content").innerHTML =
      "Sorry, your browser does not support web storage...";
  }
}
