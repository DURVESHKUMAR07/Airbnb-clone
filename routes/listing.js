const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync");
const {isLoggedin,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");

const multer  = require('multer');
const {storage} =require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingController.index))        //index route
    .post(isLoggedin,upload.single('listing[image]'),
        validateListing, wrapAsync(listingController.postNewList));        //post route
    
    // .post(upload.single('listing[image]'),(req,res)=>{
    //     res.send(req.file);
    // });

// to avoid we can use routes like this
// we can use first static route and then dynamic route
// there is no need of sequence if we use route validation

// /listing/new
// /listing/edit/:id
// /listing/view/:id


// new route
router.get("/new",isLoggedin,listingController.newList)

 
router
    .route("/:id")
    .get(wrapAsync(listingController.showList))      //show route
    .put(isLoggedin,isOwner,upload.single('listing[image]'),
        validateListing,wrapAsync(listingController.updateList))  //update route
    .delete(isLoggedin,isOwner,wrapAsync(listingController.deleteList))      //delete route


// edit route
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.editList))


module.exports=router;