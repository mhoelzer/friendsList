// make server
// inputs express into the file and saves tot he express varibale
var express = require('express');
// makes a new express object
var app = express();
// this is an http server that hasnt been started yet. we usually see http, but not all the tiem
var http = require('http').Server(app);

// use the public folder on the http server. allows access to the  public on your thing
// express.static sets upt eh server witht eh files. loads everythiing in the public folder. files that dont ned to be rerendered by any engine. uninhibited. just pass in js and serev static files up because arent going to change because server undesrtands them
// other lang arent broken down by browers and need to be further compiled into css. (less, sass, etc)
// tell node where to find static files
app.use(express.static(__dirname + '/public'));

// when it asks for that directory, do the function. the / is the directory or the base directory because just a slahs. do the function wich just returns the html
// when asks for base directory, return the index.html
// serve up the index.html file
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// listen for events on that address or port, which we siad was 3000
// process.env.PORT   create a file env (enviro var we can include), whcih is called PORT and opens up a specifc port numb or whatever is up (doesnt have to be 3000). if we put on internet and hosting site, it has to open up a port to get our stuff and serve our web stuff
// we serve these applications on these sies. 
// || either this or definitely 3000. since no folder/port, definitely 3000
http.listen(process.env.PORT || 3000, function(){
	console.log('listening on *: 3000');
});