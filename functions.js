(function()
{
	// Add a task with message task
	function add(task)
	{
		$(document.createElement("li"))
			.html("<div class=\"view\"><input class=\"toggle\" type=\"checkbox\"><label>" + task + "</label><button class=\"destroy\"></button></div>")
			.on("click", "label", function() { OnToggleListItem(getListItem(this)); })
			.on("click", ".toggle", function() { OnToggleListItem(getListItem(this)); })
			.on("click", ".destroy", function() { OnRemoveListItem(getListItem(this)); })
			.appendTo("#todo-list");
	}
	
	function getListItem(object)
	{
		return $(object).parent().parent();
	}
	
	function complete(item)
	{
		$(item).addClass('completed');
		$(".toggle", item).prop('checked', true);
	}
	
	function uncomplete(item)
	{
		$(item).removeClass('completed');
		$(".toggle", item).prop('checked', false);
	}
	
	function toggle(item)
	{
		if(isCompleted(item))
			uncomplete(item);
		else
			complete(item);
	}
	
	function isCompleted(item)
	{
		return $(item).hasClass('completed');
	}
	
	function isActive(item)
	{
		return !isCompleted(item);
	}
	
	// Removes task ID
	function remove(item)
	{
		$(item).remove();
	}
	
	function updateCount()
	{
		var countTotal = getCountTotal();
		var countComplete = getCountComplete();
		var countActive = countTotal - countComplete;
		
		setRemainingCount( countActive );
		setCompletedCount( countComplete );
	}
	
	function getCountTotal()
	{
		return $("#todo-list li").size();
	}
	
	function getCountComplete()
	{
		return $("#todo-list li.completed").size();
	}
	
	function setRemainingCount(value)
	{
		$("#todo-count").html("<strong>" + value + "</strong> items left");
	}
	
	function setCompletedCount(value)
	{
		$("#clear-completed").text("Clear completed (" + value + ")");
	}
	
	function clearAddTaskBox()
	{
		$("#new-todo").val("");
	}
	
	function isAddTaskBoxEmpty()
	{
		if($("#new-todo").val().length == 0)
			return 1;
		else
			return 0;
	}
	
	function taskBoxHasContent()
	{
		return !isAddTaskBoxEmpty();
	}
	
	function getTaskBoxText()
	{
		return $("#new-todo").val();
	}
	
	$(document).keypress(function(e) 
	{	
	    if(e.which == 13) 
	    {
		    OnAddListItem();
	    }
	    
	});
	
	$(".toggle").click(function() 
	{
		OnToggleListItem( getListItem(this) );
	});
	
	$("label").click(function() 
	{
		OnToggleListItem( getListItem(this) );
	});
	
	$(".destroy").click(function() 
	{
		OnRemoveListItem( getListItem(this) );
	});
	
	// callback functions
	function OnAddListItem()
	{
		if( taskBoxHasContent() )
		{
			var task = getTaskBoxText();
			add( task );
			clearAddTaskBox();
		}
			
		updateCount();
	}
	
	function OnRemoveListItem(item)
	{
		remove( item );
		updateCount();
	}
	
	function OnToggleListItem(item)
	{
		toggle( item );
		updateCount();
	}

})();