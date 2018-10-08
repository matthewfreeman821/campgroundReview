var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded( {extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/e835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104496f9c179a6e8b0b1_340.jpg"},
    {name: "Granite Hill", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f9c179a6e8b0b1_340.jpg"},
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f9c179a6e8b0b1_340.jpg"}
];

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    res.render('campgrounds', {campgrounds: campgrounds});
})

app.post('/campgrounds', function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect('/campgrounds');

});

app.get('/campgrounds/new', function(req, res) {
    res.render('new.ejs');
});


app.listen(5000, function(){
    console.log('Server running on port 5000');
});