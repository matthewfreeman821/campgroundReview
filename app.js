var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    seedDB = require("./seeds");

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded( {extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
seedDB();

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
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
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
    res.render('campgrounds/new.ejs');
});

//SHOW route - shows more info on one campground
app.get('/campgrounds/:id', function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

// =============================
// COMMENTS ROUTES
// =============================

app.get ('/campgrounds/:id/comments/new', function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
});

app.post('/campgrounds/:id/comments', function(req, res) {
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });

    //connect new comment to campground

    //redirect to campground showpage
});

app.listen(5000, function(){
    console.log('Server running on port 5000');
});