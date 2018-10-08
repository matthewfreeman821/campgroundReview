var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('This will be the landing page');
});


app.listen(5000, function(){
    console.log('Server running on port 5000');
});