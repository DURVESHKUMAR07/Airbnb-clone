const express=require("express");
const router=express.Router({mergeParams : true});
const wrapAsync=require("../utils/wrapAsync");
const {validateReview,isLoggedin,isReviewAuthor}=require("../middleware.js");

const reviewController=require("../controllers/reviews.js");

// review post route
router.post("/",isLoggedin,validateReview,wrapAsync(reviewController.postReview));

// review delete route
router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(reviewController.deleteReview))

module.exports=router;