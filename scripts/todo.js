"use strict";

const todoObj = {};
const addBtn = document.getElementById("btn-add");
const textInput = document.getElementById("input-task");
const todoList = document.getElementById("todo-list");

// Lấy thông tin user đang login
let userLogin = getFromStorage("userLogin").username;
let todoArrDisplay;

// Hàm tạo todoList cho user
function parseTodo(todoData) {
  const todo = new Todo(todoData.task, todoData.owner, todoData.isDone);
  return todo;
}

//Hàm xóa todoList
function deleteTodo(todoTask, todoOwner) {
  todoArr = todoArr.filter((e) => {
    if (e.task == todoTask && e.owner == todoOwner) {
      return false;
    } else {
      return true;
    }
  });
  renderTodo(todoArr);
  saveToStorage("todoArr", todoArr);
}

//Hàm đổi trạng thái hoàn thành sau khi click
function checkDone(task, owner, isDone) {
  isDone = isDone === "true" ? "false" : "true";

  todoArr = getFromStorage("todoArr");

  todoArr.forEach(function (e) {
    if (e.task === task && e.owner === owner) e.isDone = isDone;
  });
  renderTodo(todoArr);
  saveToStorage("todoArr", todoArr);
}

//Hàm render todoList
function renderTodo(todoArr) {
  todoArrDisplay = todoArr.filter((e) => e.owner === userLogin);

  todoList.innerHTML = "";

  for (let i = 0; i < todoArrDisplay.length; i++) {
    if (todoArrDisplay[i].isDone === "true") {
      todoList.innerHTML +=
        "<li class='checked' onclick='checkDone(\"" +
        todoArrDisplay[i].task +
        '","' +
        todoArrDisplay[i].owner +
        '","' +
        todoArrDisplay[i].isDone +
        "\")'>" +
        todoArrDisplay[i].task +
        "<span class='close' onclick='deleteTodo(\"" +
        todoArrDisplay[i].task +
        '","' +
        todoArrDisplay[i].owner +
        "\")'>×</span></li>";
    } else {
      todoList.innerHTML +=
        "<li onclick='checkDone(\"" +
        todoArrDisplay[i].task +
        '","' +
        todoArrDisplay[i].owner +
        '","' +
        todoArrDisplay[i].isDone +
        "\")'>" +
        todoArrDisplay[i].task +
        "<span class='close' onclick='deleteTodo(\"" +
        todoArrDisplay[i].task +
        '","' +
        todoArrDisplay[i].owner +
        "\")'>×</span></li>";
    }
  }
}

// Lấy dữ liệu todoList của user và render
todoList.innerHTML = "";
if (getFromStorage("todoArr") === null) {
  todoArr = [];
} else {
  todoArr = getFromStorage("todoArr");
}
renderTodo(todoArr);

//Thêm todoList
addBtn.addEventListener("click", function () {
  const data = {
    task: textInput.value,
    owner: userLogin,
    isDone: "false",
  };
  if (textInput.value === "") {
    alert("Please input task");
  } else {
    if (getFromStorage("todoArr") === null) {
      todoArr = [];
    } else {
      todoArr = getFromStorage("todoArr");
    }
    todoArr.push(parseTodo(data));
    saveToStorage("todoArr", todoArr);
    renderTodo(todoArr);
  }
});
