const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const review=require("./review.js");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
       url: String,
       filename: String,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    review:[{
        type:Schema.Types.ObjectId,
        ref:"review",
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing)
    {
        await review.deleteMany({_id : {$in : listing.review}});
    }
})


const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;