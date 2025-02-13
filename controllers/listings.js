const Listing=require("../models/listing");

module.exports.index=async (req,res)=>{
    const allListing=await Listing.find({});
    // console.log(allListing);
    res.render("listings/index.ejs",{allListing});
}

module.exports.newList=(req,res)=>{
    res.render("listings/newlist.ejs");
}

module.exports.showList=async (req,res)=>{           //id is dynamic parameter , sequence is important
    let {id}=req.params;
    const list=await Listing.findById(id)
    .populate({path: "review", populate: {path: "author"},
    })
    .populate("owner");
    if(!list)
    {
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listing");
    }
    console.log(list);
    res.render("listings/show.ejs",{list});
}

module.exports.postNewList=async (req,res,next)=>{
    // let {image,title,description,price,location,country}=req.body;
    // const listing=req.body.listing;

    // try{
        let url=req.file.path;
        let filename=req.file.filename;
        
        const newlisting=await new Listing(req.body.listing);
        newlisting.owner=req.user._id;
        newlisting.image={url,filename};
        await newlisting.save();
        req.flash("success","New Listing Created!");
        res.redirect("/listing");
    // }catch(err){
    //     next(err);
    // }

}

module.exports.editList=async (req,res)=>{
    let {id}=req.params;
    const list=await Listing.findById(id);
    if(!list)
        {
            req.flash("error","Listing you requested for does not exist!");
            res.redirect("/listing");
        }
    let originalImageURL=list.image.url;
    originalImageURL = originalImageURL.replace("/upload","/upload/h_250,w_400")
    res.render("listings/edit.ejs",{list, originalImageURL});
}


module.exports.updateList=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file != "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }

    req.flash("success","Listing Updated!");
    res.redirect(`/listing/${id}`);
}

module.exports.deleteList=async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    const deletelist=await Listing.findByIdAndDelete(id);
    console.log(deletelist);
    req.flash("success","Listing Deleted!");
    res.redirect("/listing");
}