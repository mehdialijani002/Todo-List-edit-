const defaultOptions = {
  closeOnClick: true,
  displayCloseButton: false,
  positionClass: "nfc-top-right",
  onclick: false,
  showDuration: 3500,
  theme: "success",
};
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const message = document.getElementById("message");
const todos = JSON.parse(localStorage.getItem("todos"));
const todoEls = todosUL.querySelectorAll("li");

document.getElementById("submitBtn").addEventListener("click", function () {
  let inputValue = document.getElementById("input").value;
  if (inputValue === "") {
    swal("ERROR", "Please add you task!", "error");
  }
});
if (todos) {
  todos.forEach((todo) => addTodo(todo));
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;
  if (todo) {
    todoText = todo.text;
  }
  if (todoText) {
    const todoEl = document.createElement("li");

    message.style.display = "none";
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }
    todoEl.innerText = todoText;

    const closeButton = document.createElement("button");
    closeButton.innerText = "";

    closeButton.classList.add("closeButton");
    closeButton.addEventListener("click", (event) => {
      event.stopPropagation();

      let liNumber = liCount;

      document.getElementById("liNumber").innerText = liNumber;
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          }).then(() => {
            todoEl.remove();
            if (liNumber === 0) {
              message.style.display = "";
            }
          });
        } else {
          swal("Your imaginary file is safe!");
          let liCount = document.querySelectorAll("li").length;
          let liNumber = liCount;

          document.getElementById("liNumber").innerText = liNumber;
        }
      });
    });
    todoEl.appendChild(closeButton);
    let liCount = document.querySelectorAll("li").length;
    let liNumber = liCount + 1;

    document.getElementById("liNumber").innerText = liNumber;
    document
      .getElementById("resetButton")
      .addEventListener("click", resetLiNumber);
    function resetLiNumber() {
      liNumber = 0;
      document.getElementById("liNumber").innerText = liNumber;
      message.style.display = "";
    }
    todoEl.addEventListener("click", () => {
      const done = todoEl.classList.toggle("completed");
      if (done) {
        todoEl.style.width = "300px";
      } else {
        todoEl.style.width = "350px";
      }
      updateLS();
    });

    const liDelete = Array.from(document.querySelectorAll("li"));
    const deleteButton = document.querySelector(".clearButton");
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      message.style.display = "";
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          }).then(() => {
            liDelete.forEach((li) => {
              li.remove();
            });
            todoEl.remove();
          });
        } else {
          swal("Your imaginary file is safe!");
          let liCount = document.querySelectorAll("li").length;
          let liNumber = liCount;
          document.getElementById("liNumber").innerText = liNumber;
          message.style.display = "none";
        }
      });
      updateLS();
    });
    todosUL.appendChild(todoEl);
    input.value = "";
    updateLS();
  }
}
function updateLS() {
  let todosEl = document.querySelectorAll("li");
  const todos = [];
  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
