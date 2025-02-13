const user=require("../models/user");


module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signUP=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new user({email,username});
        const registeredUser=await user.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err)
            {
                return next(err);
            }
            req.flash("success","Welcome to WanderLust!");
            res.redirect("/listing");
        })
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}

module.exports.loginForm=(req,res)=>{
    console.log("right")
    res.render("users/login.ejs");
}

module.exports.login=async (req,res)=>{
    req.flash("success","Welcome back to WanderLust!");
    // res.redirect("/listing");
    let redirectUrl=res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
    // res.send("logged in");
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            return next(err);
        }
        req.flash("success","Logged out successfully!");
        res.redirect("/listing");
    })
}