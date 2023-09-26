const express=require('express')
const router =express.Router()
const bcrypt=require('bcrypt')
const User= require('../models/user')
const jwt = require('jsonwebtoken');
const jwtSecret = "HaHa"

const { body, validationResult } = require('express-validator');
router.post("/createuser",[
    body('email').isEmail(),
  // password must be at least 5 chars long
  body('name').isLength({ min: 5 }),
  body('password','Incorrect Password').isLength({ min: 5 })]
  ,  async(req,res)=>
{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
    try{
        await User.create(
            {
                name:req.body.name,
                location:req.body.location,
                email:req.body.email,               
                password:securePass,
                

            }
        )
        res.json({success:true});
    }
        catch(error)
        { console.log(error)
            res.json({success:false});

    }
}

)


/*
router.post("/createuser",[
    body('email').isEmail(),
  // password must be at least 5 chars long
  body('name').isLength({ min: 5 }),
  body('password','Incorrect Password').isLength({ min: 5 }),]
  ,  async(req,res)=>
{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
    try{
        await User.create(
            {
                name:req.body.name,
                location:req.body.location,
                email:req.body.email,               
                password:securePass,
                

            }
        )
        res.json({success:true});
    }
        catch(error)
        { console.log(error)
            res.json({success:false});

    }
}

)

*/
router.post("/login",[
    body('email').isEmail(),
  // password must be at least 5 chars long
 
  body('password','Incorrect Password').isLength({ min: 5 }),]
  ,  async(req,res)=>
{
    let email=req.body.email
    
    try{
        let userData= await User.findOne({email});
        if (!userData) {
            return res.status(400).json({ errors: "incorrect credentials"});
          }
          const pwdCompare = await bcrypt.compare(req.body.password, userData.password); // this return true false.
          if (!pwdCompare) {
              return res.status(400).json({ errors: "Try Logging in with correct credentials" });
          }
          const data = {
            user: {
                id: userData.id
            }
        }
        
        const authToken = jwt.sign(data, jwtSecret);
       

        return res.json({success:true,authToken:authToken})
    }
        catch(error)
        { console.log(error)
            res.json({success:false});

    }
}

)
module.exports=router;