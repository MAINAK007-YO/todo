const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("youTodo"));
};

const addTodoLocalStorage = (localTodo) => {
  return localStorage.setItem("youTodo", JSON.stringify(localTodo));
};

let localTodo = getTodoListFromLocal() || [];

const addTodoDynamicEle = (cElement) => {
  const divElement = document.createElement("div");
  divElement.classList.add("main_todo_div");
  divElement.innerHTML = `<li>${cElement}</li> <button class="deleteBtn">Delete</button>`;
  mainTodoElem.append(divElement);
};

const addTodoList = (e) => {
  e.preventDefault();

  const todoListValue = inputValue.value.trim();

  inputValue.value = "";

  if (todoListValue !== "" && !localTodo.includes(todoListValue)) {
    localTodo.push(todoListValue);
    localTodo = [...new Set(localTodo)];
    console.log(localTodo);
    localStorage.setItem("youTodo", JSON.stringify(localTodo));

    addTodoDynamicEle(todoListValue);
  }
};

const showTodoList = () => {
  localTodo = getTodoListFromLocal() || [];
  console.log(localTodo);
  localTodo.forEach((cElement) => {
    addTodoDynamicEle(cElement);
  });
};

showTodoList();

const removeTodo = (e) => {
  const todoToRemove = e.target;
  let todoListContent = todoToRemove.previousElementSibling.innerText;
  console.log(todoListContent);
  let parentEle = todoToRemove.parentElement;

  localTodo = localTodo.filter((curEle) => {
    return curEle !== todoListContent.toLowerCase();
  });

  addTodoLocalStorage(localTodo);
  parentEle.remove();
  console.log(localTodo);
};

mainTodoElem.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("deleteBtn")) {
    removeTodo(e);
  }
});

inputValue.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTodoList(e);
  }
});

document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  addTodoList(e);
});
