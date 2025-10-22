const form = document.getElementById("todo-form");
const input =  document.getElementById("todo-input");
const list = document.getElementById("todo-list")
const leftCount = document.getElementById("left-count")
const filterButtons = document.querySelectorAll(".filter");
let todos = [];
let currentFilter = "all";
 function addTodo(title) {
    const trimmed = title.trim();
    if (!trimmed) return
    todos.unshift({ id: uid(),title: trimmed })
    console.log(todos)
    render();
};
function removeTodo(id) {
    todos = todos.filter((item) => item.id !== id );
    render();
}
function filteredTodos() {
    if (currentFilter === "active") return todos.filter(function (todo) {return !todo.completed; });
     if (currentFilter === "completed") return todos.filter(function (todo) {return todo.completed; });
     return todos;
}
function uid() {
    return Math.random().toString(36).slice(2, 9);
};
function render() {
    leftCount.textContent = todos.filter(function (todo) {return !todo.completed;}).length;
    list.innerHTML ="";
    const items = filteredTodos();
    for (let i = 0; i < items.length; i++){
        let item = items[i]
        let li =document.createElement('li');
        li.className = "todo-item"
        list.appendChild(li);

        let title = document.createElement('p')
        title.className = 'title';
        title.textContent = item.title;

        let checkbox = document.createElement("input")
        checkbox.type = "checkbox";
        
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
