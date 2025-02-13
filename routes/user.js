const express=require("express");
const router=express.Router();
const user=require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController=require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(userController.signUP)


router
    .route("/login")
    .get(userController.loginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local",
            {failureRedirect: "/login", failureFlash: true,}),
            userController.login);


router.get("/logout",userController.logout)


module.exports=router;