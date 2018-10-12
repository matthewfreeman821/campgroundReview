var Campground = require('../models/campground');
var Comment = require('../models/comment');
// All the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    //if user logged in
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err) {
                res.redirect('back');
            } else {
                //does user own campground?
                //foundCampground.author.id is a mongoose obj, req.user._id is a string, hence the .equals()
                if(foundCampground.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        res.redirect('back');
                }
            }
        });
    } else{
            //otherwise, redirect
            res.redirect('back');
    }
    //if not, redirect
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    //if user logged in
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                res.redirect('back');
            } else {
                //does user own comment?
                //foundComment.author.id is a mongoose obj, req.user._id is a string, hence the .equals()
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    //otherwise, redirect
                    res.redirect('back');
                }
            }
        });
    } else{
            //if not, redirect
        res.redirect('back');
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please Login First!');
    res.redirect('/login');
};

module.exports = middlewareObj;