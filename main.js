
const todo = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;

todo.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggableTodo = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
  console.log("dragStart");
}

function dragEnd() {
  draggableTodo = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
  console.log("dragEnd");
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
  //   console.log("dragOver");
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
  console.log("dragEnter");
}

function dragLeave() {
  this.style.border = "none";
  console.log("dragLeave");
}

function dragDrop() {
  this.style.border = "none";
  this.appendChild(draggableTodo);
  console.log("dropped");
}

/* modal */
const btn = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

function createModal() {
  btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(btn.dataset.targetModal).classList.add("active");
      overlay.classList.add("active");
    });
  });
  
  close_modals.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      modal.classList.remove("active");
      overlay.classList.remove("active");
    });
  });
  
  window.onclick = (event) => {
    if (event.target == overlay) {
      const modals = document.querySelectorAll(".modal");
      modals.forEach((modal) => modal.classList.remove("active"));
      overlay.classList.remove("active");
    }
  };
}
createModal();

/* create todo  */
const todo_submit = document.getElementById("todo_submit");
todo_submit.addEventListener("click", createTodo);

function createTodo() {
  const todo_div = document.createElement("div");
  const input_val = document.getElementById("todo_input").value;
  if(isNullOrEmpty(input_val)) {
    showMessage("This is required content!");
    clear();

  } else {
    const txt = document.createTextNode(input_val);
  
    todo_div.appendChild(txt);
    todo_div.classList.add("todo");
    todo_div.setAttribute("draggable", "true");
  
    /* create span */
    const span = document.createElement("span");
    const span_txt = document.createTextNode("\u00D7");
    span.classList.add("close");
    span.appendChild(span_txt);
  
    todo_div.appendChild(span);
  
    no_status.appendChild(todo_div);
  
    span.addEventListener("click", () => {
      span.parentElement.style.display = "none";
    });
    //   console.log(todo_div);
  
    todo_div.addEventListener("dragstart", dragStart);
    todo_div.addEventListener("dragend", dragEnd);
  
    document.getElementById("todo_input").value = "";
    todo_form.classList.remove("active");
    overlay.classList.remove("active");
  }

}

const close_btn = document.querySelectorAll(".close");
close_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});

function isNullOrEmpty(str) {
  return str == null || str.trim() == "";
}

function showMessage(msg){
  let alert = document.getElementById('alert');
  alert.classList.remove('d-none');
  alert.innerHTML = msg;

  autoCloseMessage();
}
function closeMessage(){
  let alert = document.getElementById('alert');
  alert.classList.add('d-none');
}

function autoCloseMessage(){
  setInterval(() => {
      closeMessage();
  }, 5*1000); 
}

function clear() {
  document.getElementById('todo_input').value = '';
}
