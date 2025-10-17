const form = document.getElementById("todo-form");
const input =  document.getElementById("todo-input");
const list = document.getElementById("todo-list")
let todos = [];
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

function uid() {
    return Math.random().toString(36).slice(2, 9);
};
function render() {
    list.innerHTML ="";
    for (let i = 0; i < todos.length; i++){
        let item = todos[i]
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

