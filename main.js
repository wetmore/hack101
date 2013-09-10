(function() {

var todos = {};
var numLeft = 0;

function addTodo(text, completed) {
  var id = getNewId();
  
  todos[id] = {
    task: text,
    completed: completed,
    id: id
  };

  if (!completed) {
    numLeft++;
    renderNumLeft(numLeft);
  }

  renderAll(todos);
}

function removeTodo(id) {

  var todo = todos[id];

  if (id === undefined) {
    console.error('no todo with that id found. did not remove anything!');
  } else {
    if (todos[id].completed === false) {
      numLeft--;
      renderNumLeft(numLeft);
    }
    delete todos[id];
  }

  renderAll(todos);
}

function toggleTodo(id) {
  var todo = todos[id];
  if (todo.completed) {
    todo.completed = false;
    numLeft++;
  } else {
    todo.completed = true;
    numLeft--;
  }
  renderNumLeft(numLeft);
}

function onToggle(id) {
  toggleTodo(id);
  renderAll(todos);
}

function newTodo(text) {
  addTodo(text, false);
}

function onDestroy(id) {
  removeTodo(id);
}

window.onToggle = onToggle;
window.onNewTodo = newTodo;
window.onDestroy = onDestroy;

addTodo('Attend first HackNight', true);

})(); // immediately execute the function when this file is loaded
