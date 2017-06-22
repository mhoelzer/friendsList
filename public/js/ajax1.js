// ajax is a way to communicate with api
// names the variables that get declared a jquery object. the $ doesnt mean anything in var name, just to identify jquerey object, but you could always delete it everywhere if want
// it is jquery object because it uses jquery to get stuff
// the $ just references elsewhere and says its going to be a jquery
var $friends = $('#friends');
var $name = $('#name');
var $grade = $('#grade');
var $deets = $('#deets');

// this is used below/for the mustache {{}}/friend function to display the info
// it isnt really used below, so it could be declared down
// have to display the stuff
// everytime yoou add a friend, it does this
// below is what mustache is looking for/the mustache template
// could just do a "<li>\<p><strong>Name:</strong> {{name}}</p>\<p><strong>Age:</strong> {{age}}</p>\<button id='{{id}}' class='remove'>X</button>\</li>";
// has the 3 bits of info: name and age and id
var friendTemplate = "" +
	"<li>" +
	"<p><strong>Name:</strong> {{name}}</p>" +
	"<p><strong>Grade:</strong> {{grade}}</p>" +
	"<p><strong>The Deets:</strong> {{deets}}</p>" +
	// the id allows for speification and ability to delete
	"<button id='{{id}}' class='remove'>She doesn't even go here!</button>" +
	"</li>";

// mustache = class that allows you do to editing
// add to end of friend whatever passed it
function addFriend(friend){
	// take this and repacle the {{name}} with what was typed in
	// this goes back to the dom to find it instead of going back out and finding it. it 
	// mustache = allows us to add certain templates. nav bar and footer are on every page (usually) and these are part of that and are built in. create a layout with those things as static and thenn change things that go between
	$friends.append(Mustache.render(friendTemplate, friend));
};

// says for when the document is ready
$(document).ready(function(){
	// submitting ajax requesst to the url to do teh ajax
	$.ajax({
		// what type of request? a get. where we going to get? the url
		type: 'GET',
		url: 'http://rest.learncode.academy/api/learncode/mh',
		// successs emans did go through and returned, but done means went through even if not errored. better to use done because it can run but not finish
		// when request is finished, add all the friends
		// this will return list of friends. this friends refers to the #friends
		success: function(friends){
			// the i is the index location in the array. it could be w/e, like an _ 
			// for each object in friends, do the add option
			$.each(friends, function(i, friend){
				// if not the frind.na,e not exists. does NOT NOT exiat
				if(!(!friend.name)&&!(!friend.grade)&&!(!friend.deets))addFriend(friend);
			});
		},
		// if fails, gives them the message
		error: function(){
			alert('Stop trying to make fetch happen!');
		}
	});
	$('#add-friend').on('click', function(){
	// could do just .click. on the click, do that function
		// make a friend object with name and age. 
		var friend = {
			// get the value of those objects from the id of name from the friend 
			// object: value
			name: $name.val(),
			grade: $grade.val(),
			deets: $deets.val()
		};
		$.ajax({
			// submit ajax reuqst to post the url
			// when put a nam ein the boxes those have an id
			type: 'POST',
			// dont need the slash because it doesnt have anything after/no id
			url: 'http://rest.learncode.academy/api/learncode/mh',
			// for this object friend from the click event since still inside the click event, pass to the url above
			data: friend,
			// if request goes through, add friend
			success: function(newFriend){
				addFriend(newFriend);
			},
			// if not, send out this alert
			error: function(){
				alert('Stop trying to make fetch happen!');
			}
		});
	}); //end click event 
	// .delegate allows you to remove items that were loaded by other students. works for stuff you havent even added yet. you dk how many friends you will haev
	// deligate says for every object with the remove class, for the click event, do the function. document delegate could have worked, but the $friends is jus tthe name and number
	$friends.delegate('.remove', 'click', function(){
		// closest list item in w/e you clicked, get it and pass it to var to use it. the li is for us to know, except the 'li' is needed
		// looks for nearest list item when you click
		// the this references above
		playSound('playdelete');
		var $li = $(this).closest('li');
		// AJAX DELETE function = click the .remove class button and the id identifies what to delete
		$.ajax({
			// ask ajax to delete
			// need an id when trying to delete otherwise we arent specifying
			type: 'DELETE',
			// need a slash after the friends because it adds in the id part
			// the id knows what to delete
			// finding attribute of id
			url: 'http://rest.learncode.academy/api/learncode/mh/' + $(this).attr('id'),
			success: function(){
				// take the li and fadeout and remove it
				// the 300 means the speed/the time. the function is the callback
				$li.fadeOut(300, function(){
					// this is a diff this because in diff function. its a keyword that changes
					// the this is relativ to w/e its contained in
					// this this f
					$(this).remove();
				});
			}
		});
	});
});