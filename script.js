const STORAGE_KEY = "simple_todos_v1";
const form = document.getElementById("todo-form");
const input =  document.getElementById("todo-input");
const list = document.getElementById("todo-list")
const leftCount = document.getElementById("left-count")
const filterButtons = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");
let todos = [];
let currentFilter = "all";
 function addTodo(title) {
    const trimmed = title.trim();
    if (!trimmed) return
    todos.unshift({ id: uid(),title: trimmed, completed: false })
    console.log(todos)
    save(); render();
};
function removeTodo(id) {
    todos = todos.filter((item) => item.id !== id );
    save(); render();
}
function filteredTodos() {
    if (currentFilter === "active") return todos.filter(function (todo) {return !todo.completed; });
     if (currentFilter === "completed") return todos.filter(function (todo) {return todo.completed; });
     return todos;
}
function toggleTodo(id) {
    let todo = todos.find(function (x) { return x.id === id; });
    if (todo) {
        todo.completed = !todo.completed;
        save(); render();
    }
}
function uid() {
    return Math.random().toString(36).slice(2, 9);
};

function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
function load() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}
    function render() {
    leftCount.textContent = todos.filter(function (todo) {return !todo.completed;}).length;
    list.innerHTML ="";
    const items = filteredTodos();
    for (let i = 0; i < items.length; i++){
        let item = items[i]
        let li =document.createElement('li');
        li.className = "todo-item" +(item.completed ? " completed" : "");
        list.appendChild(li);

        let title = document.createElement('p')
        title.className = 'title';
        title.textContent = item.title;

        let checkbox = document.createElement("input")
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;
        checkbox.addEventListener("change", (function (id) {
            return function () { toggleTodo(id); };
        })(item.id));
        let del = document.createElement("button")
        del.className = "btn";
        del.textContent = "削除";
        del.addEventListener("click", function (e) {
            removeTodo(item.id)
        })
        li.appendChild(checkbox);
        li.appendChild(title);
        li.appendChild(del);
    }
}
form.addEventListener("submit", function (e){
  e.preventDefault();
    addTodo( input.value );
    input.value = "";
}); 
filterButtons.forEach(function (currentBtn) {
    currentBtn.addEventListener("click", function () {
       filterButtons.forEach(function(btn) {
        btn.classList.toggle("is-active", btn === currentBtn);
     });
     currentFilter = currentBtn.dataset.filter;
     render()
    });
});
clearCompletedBtn.addEventListener("click", clearCompleted);
function clearCompleted() {
    todos = todos.filter(function (t) { return !t.completed; });
   save(); render();
}
todos = load();
render();