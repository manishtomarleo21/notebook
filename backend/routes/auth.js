const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//JWT signature
const JWT_SECRET = "ThisisthesecretadditionpasssignofJWT"

//create a user using: POST '/api/auth/createuser'. No login required
router.post('/createuser',[
    body('name', 'Enter a valid name.').isLength({ min: 3 }),
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password must be at least of 5 characters.').isLength({ min: 5 }),
], async (req, res)=>{
    //If there are errors in validations send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check weather the user exist with the same mail id 
    try {
        
    //await till it resolved.
    let user = await User.findOne({email:req.body.email})
    if (user){
        return res.status(404).json({error:"Sorry! User already exists with the same mail ID."})
    }
    //securing password with bcryptjs npm package
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)

    //creates a new user
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      })
    
    const data = {
        user:{
            id:user.id
        }
    } 
    const authToken = jwt.sign(data, JWT_SECRET);
    
    // res.json(user)
    res.json({authToken})
    }
    catch (error) {
       console.error(error.message);
       res.status(500).send('Some error occured') 
    }
})

module.exports = router