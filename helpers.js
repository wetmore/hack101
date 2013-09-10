var $todoList = $('#todo-list');

/* when passed an object of todo objects of the form
 *   {
 *     completed: boolean,
 *     task: string,
 *     id: number
 *   }
 * this function will render the todos by emptying the current list, then 
 * appending list item nodes (li) to the #todo-list ul
 */
function renderAll(todos) {
  $todoList.empty();

  // loops over the list of todos
  for (key in todos) {
    var todo = todos[key];
    var li = $(document.createElement("li"))
      .html(
          '<div class="view"><input class="toggle" type="checkbox" id="checkbox'
        + todo.id + '"><label for="checkbox' + todo.id + '">'
        + todo.task
        + '</label><button class="destroy"></button></div>'
      )
      .attr('id', 'todo' + todo.id)

    if (todo.completed) {
      li.addClass('completed');
      li.find('.toggle').prop('checked', true);
    }
    li.appendTo("#todo-list");
    
  }
}

/* renders the number passed to the function at the bottom of the list of todos
 */
function renderNumLeft(num) {
	$("#todo-count").html("<strong>" + num + "</strong> items left");
}

/* returns a new, unused id for a todo
 *
 * It looks sort of weird, but the way this is set up, n is a variable whose
 * context is the function which we immediately invoke. By doing this, n is not
 * a global variable, and can only be accessed by other functions in the same
 * context, such as the one that we return. The function we return gets assigned
 * to the name "getNewId" in the global context (the window object). When we
 * call it, it increments n and returns a new id.
 *
 * This is an example of a closure. The function we return closes over the
 * context it is declared in, and therefore it can access n.
 */
var getNewId = (function() {
  var n = 0;
  return function() {
    n++;
    return n - 1;
  }
})();

