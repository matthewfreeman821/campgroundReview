var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded( {extended: true}));
app.set('view engine', 'ejs');

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f9c179a6e8b0b1_340.jpg",
//         description: "This is a huge granite hill...no bathroom...no water...beautiful granite!"
//     }, function(err, campground) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log('Newly created campground');
//             console.log(campground);
//         }
//     });

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
    var newCampground = {name: name, image: image};
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