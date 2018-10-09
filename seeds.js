var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');

var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.pexels.com/photos/134073/pexels-photo-134073.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores fuga delectus accusantium, atque, aliquid porro quod facere incidunt voluptate inventore recusandae quisquam? Porro sint perferendis, quisquam recusandae nemo explicabo dicta!"
    },
    {
        name: "Desert Masa",
        image: "https://images.pexels.com/photos/221436/pexels-photo-221436.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores fuga delectus accusantium, atque, aliquid porro quod facere incidunt voluptate inventore recusandae quisquam? Porro sint perferendis, quisquam recusandae nemo explicabo dicta!"
    },
    {
        name: "Canyon Floor",
        image: "https://images.pexels.com/photos/167685/pexels-photo-167685.jpeg?auto=compress&cs=tinysrgb&h=350",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores fuga delectus accusantium, atque, aliquid porro quod facere incidunt voluptate inventore recusandae quisquam? Porro sint perferendis, quisquam recusandae nemo explicabo dicta!"
    },
]

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log('Removed campgrounds!');
        Comment.remove({}, function(err) {
            if(err) {
                console.log(err);
            }
            console.log('Removed comments!');
            //add a few campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if(err) {
                        console.log(err);
                    } else {
                    console.log('Added a campground!');
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet!",
                            author: "Homer" 
                        }, function(err, comment) {
                            if(err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log('Created new comment!');
                            }
                        });
                    }
                });
            });
        });
    });
}

module.exports = seedDB;