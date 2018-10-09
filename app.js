var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded( {extended: true}));
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    res.render('landing');
});

//INDEX route - shows all campgrounds
app.get('/campgrounds', function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {campgrounds: allCampgrounds});
        }
    })
})

//CREATE route - makes a new campground
app.post('/campgrounds', function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // Create a new campground and save to the DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    });

});

//NEW route - shows form to create new campground
app.get('/campgrounds/new', function(req, res) {
    res.render('new.ejs');
});

//SHOW route - shows more info on one campground
app.get('/campgrounds/:id', function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render('show', {campground: foundCampground});
        }
    });
})


app.listen(5000, function(){
    console.log('Server running on port 5000');
});