//Selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//////////////////////////Funtions//////////////////////////////
function addTodo(event) {
	event.preventDefault(); //Prevent form from submitting
	// Todo div
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	// Create li
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo); //Sticking li element into the div
	// Add Todo to local storage
	saveLocalTodos(todoInput.value);
	//Check mark button
	const completeButton = document.createElement("button");
	completeButton.innerHTML = '<i class="fas fa-check"></i>';
	completeButton.classList.add("complete-btn");
	todoDiv.appendChild(completeButton);
	// Check trash button
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	// Append to list(ul)
	todoList.appendChild(todoDiv);
	// Clear input value
	todoInput.value = "";
}

// Function deleteCheck
function deleteCheck(clickedItem) {
	const item = clickedItem.target;
	// Delete Todo
	if (item.classList[0] === "trash-btn") {
		const todo = item.parentElement;
		// Animation
		todo.classList.add("fall");
		removeLocalTodos(todo);
		todo.addEventListener("transitionend", function () {
			todo.remove();
		});
	}

	//Check Mark
	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}

// Filter function
function filterTodo(fill) {
	const todos = todoList.childNodes;
	todos.forEach(function (todo) {
		switch (fill.target.value) {
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if (todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			case "uncompleted":
				if (!todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
}

// Save to local storage
function saveLocalTodos(todo) {
	// CHECK --- HEY Do I already have thing in there?
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo) {
	// CHECK --- HEY Do I already have thing in there?
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach(function (todo) {
		// Todo div
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		// Create li
		const newTodo = document.createElement("li");
		newTodo.innerText = todo;
		newTodo.classList.add("todo-item");
		todoDiv.appendChild(newTodo); //Sticking li element into the div
		//Check mark button
		const completeButton = document.createElement("button");
		completeButton.innerHTML = '<i class="fas fa-check"></i>';
		completeButton.classList.add("complete-btn");
		todoDiv.appendChild(completeButton);
		// Check trash button
		const trashButton = document.createElement("button");
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add("trash-btn");
		todoDiv.appendChild(trashButton);
		// Append to list(ul)
		todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo) {
	// CHECK --- HEY Do I already have thing in there?
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	const todoIndex = todo.children[0].innerHTML;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}
