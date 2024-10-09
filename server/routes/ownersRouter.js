const express = require("express");
const router = new express.Router();
const ownerdb = require("../models/OwnerSchema");
const bcrypt = require("bcryptjs");
const authenticateOwner = require("../middleware/owner-authenticate");

// User registration route
router.post("/register", async (req, res) => {
  // console.log(req.body);
  
  const { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Fill all the details" }); 
  }

  try {
    const preuser = await ownerdb.findOne({ email: email });

    if (preuser) {
      return res.status(422).json({ error: "This Email is Already Exist" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Password and Confirm Password Not Match" });
    } else {
      const finalUser = new ownerdb({
        name,
        email,
        phone,
        password,
        cpassword,
      });

      const storeData = await finalUser.save();
      return res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    console.log("catch block error", error);
    return res.status(422).json({ error: "An error occurred", details: error.message }); 
  }
});


// User login route
router.post("/login", async (req, res) => {
  // console.log(req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const userValid = await ownerdb.findOne({email:email});

     if(userValid){

         const isMatch = await bcrypt.compare(password,userValid.password);

         if(!isMatch){
             res.status(422).json({ error: "invalid details"})
         }else{
             const token = await userValid.generateAuthtoken();//Asynchronous functions

            //  console.log(token); 

            //  cookiegenerate
             res.cookie("ownercookie",token,{
                 expires:new Date(Date.now()+9000000),
                 httpOnly:true
             });

             const result = {
                 userValid,
                 token
             }
             res.status(201).json({status:201,result})
         }
     }

 } catch (error) {
     res.status(401).json(error);
     console.log("catch block");
 }
});

// user valid
router.get("/validuser",authenticateOwner,async(req,res)=>{
  try {
    const ValidUserOne = await ownerdb.findOne({_id:req.userId});
    res.status(201).json({status:201,ValidUserOne});
} catch (error) {
    res.status(401).json({status:401,error});
}
});

// user logout

  router.get("/logout",authenticateOwner,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token   // to get 1 out of 4 tokens
        });

        res.clearCookie("ownercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
  })

module.exports = router;
