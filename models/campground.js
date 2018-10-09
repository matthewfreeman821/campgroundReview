var mongoose = require('mongoose');

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

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

module.exports  = mongoose.model('Campground', campgroundSchema);