var express = require('express');
var router = express.Router({mergeParams: true});//must be true in order to access campground id in params
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');


//Comments new
router.get ('/new', middleware.isLoggedIn, function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
});

//Comments create
router.post('/', middleware.isLoggedIn, function(req, res) {
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    req.flash('error', 'Something went wrong');
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash('succes', 'Successfully added comment!!!')
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });

    //connect new comment to campground

    //redirect to campground showpage
});

//Edit comments
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
            res.redirect('back');
        } else {
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//Update comment
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//Destroy comment route
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            res.redirect('back');
        } else {
            req.flash('success', 'You have removed your comment');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// //middleware-no longer necessary because of refactoring
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login');
// };

// function checkCommentOwnership(req, res, next) {
//     //if user logged in
//     if(req.isAuthenticated()) {
//         Comment.findById(req.params.comment_id, function(err, foundComment) {
//             if(err) {
//                 res.redirect('back');
//             } else {
//                 //does user own comment?
//                 //foundComment.author.id is a mongoose obj, req.user._id is a string, hence the .equals()
//                 if(foundComment.author.id.equals(req.user._id)) {
//                     next();
//                 } else {
//                     //otherwise, redirect
//                     res.redirect('back');
//                 }
//             }
//         });
//     } else{
//         //if not, redirect
//         res.redirect('back');
//     }
// };

module.exports = router;