const review=require("../models/review");
const Listing=require("../models/listing");

module.exports.postReview=async(req,res)=>{

    console.log(req.params.id);
    let listing=await Listing.findById(req.params.id);
    let newReview=new review(req.body.review);
    newReview.author=req.user._id;
    console.log(newReview);
    listing.review.push(newReview);

    await newReview.save();
    await listing.save();

    let {id}=req.params;
    console.log("new review saved");
    // res.send("new review saved");
    req.flash("success","New Review Created!");
    res.redirect(`/listing/${id}`);
}


module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {review:reviewId} });
    await review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listing/${id}`);
}