(function() {

  $('#todo-list').on('change', '.toggle', function(e) {
    // the id for the todo is stored in the checkbox's id attribute, as 
    // "checkboxN" where N is the id number. Here we parse out that id
    var id = parseInt(e.target.id.substr('checkbox'.length), 10);
    // if the callback function is defined we call it, passing in the id for
    // the todo we are toggling
    if (typeof(window.onToggle) === 'function') {
      onToggle(id);
    } else {
      console.log('no callback function defined');
    }
  });

  $('#new-todo').on('keypress', function(e) {
    // if the key pressed is the enter key...
    if (e.which == 13) {
      // ...then we grab the text from the textbox, and if it's not the empty
      // string...
      var text = $('#new-todo').val();
      if (text !== '') {
        // ...we clear the textbox and call the callback function, if it's
        // defined
        $('#new-todo').val('');
        if (typeof(window.onNewTodo) === 'function') {
          onNewTodo(text);
        } else {
          console.log('no callback function defined');
        }
      }
    }
  });
  
  $('#todo-list').on('click', '.destroy', function(e) {
    // same as for the change event for the checkboxes, except here the id is
    // "todoN" where N is the todo id number. 
    var idtext = $(e.target).parents('li').attr('id');
    var id = parseInt(idtext.substr('todo'.length), 10);
    if (typeof(window.onDestroy) === 'function') {
      onDestroy(id);
    } else {
      console.log('no callback function defined');
    }
  });

})();
