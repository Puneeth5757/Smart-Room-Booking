const express = require("express");
const router = new express.Router();
const admindb = require("../models/adminSchema");
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const admin_authenticate = require("../middleware/admin_authenticate")

// for admin login

router.post("/admin-login", async (req, res) => {
    // console.log(req.body);
  
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(422).json({ error: "fill all the details" });
    }
  
    try {
      const adminValid = await admindb.findOne({email:email});
  
      // console.log(adminValid)
  
       if(adminValid){
  
           const isMatch = await bcrypt.compare(password,adminValid.password);
  
           if(!isMatch){
               res.status(422).json({ error: "invalid details"})
           }else{
               // token generate
               const token = await adminValid.generateAuthtoken();
  
              //  console.log(token); 
  
              //  cookiegenerate
               res.cookie("admincookie",token,{
                   expires:new Date(Date.now()+9000000),
                   httpOnly:true
               });
  
               const result = {
                adminValid,
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
  
  // admin valid
  router.get("/validadmin",admin_authenticate,async(req,res)=>{
    try {
      const ValidAdminOne = await admindb.findOne({_id:req.adminId});
    //   console.log(ValidAdminOne)
      res.status(201).json({status:201,ValidAdminOne});
  } catch (error) {
      res.status(401).json({status:401,error});
  }
  });

   // admin logout
   router.get("/admin-logout",admin_authenticate,async(req,res)=>{
    try {
        req.rootadmin.tokens =  req.rootadmin.tokens.filter((curelem)=>{
            return curelem.token !== req.token   // to get 1 out of 4 tokens
        });
  
        res.clearCookie("admincookie",{path:"/"});
  
        req.rootadmin.save();
  
        res.status(201).json({status:201})
  
    } catch (error) {
        res.status(401).json({status:401,error})
    }
  })

  // to retrieve all users
  router.get("/users", async (req, res) => {
    try {
      const users = await userdb.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete user route
  router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userdb.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update user route
router.put('/:id',async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await userdb.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: error.message });
  }
});

  module.exports = router;
  
  
 
  
