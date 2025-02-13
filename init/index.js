
const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

const mongoose_url="mongodb://127.0.0.1:27017/wanderlust";


main().then(()=>{                          //if we rename main then we use it everywhere where main is used
    console.log("connect to DB (index.js)");
       
}).catch((err)=>{
    console.log(err);
});

async function main() {                    //here we use different name for main like connectoToDB and others
    await mongoose.connect(mongoose_url);
}

const initDB=async ()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({
        ...obj,
        owner: "675d652344d09f1540c9fe38",
    }))
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
};

initDB();
