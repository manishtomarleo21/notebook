const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


//JWT signature
const JWT_SECRET = "ThisisthesecretadditionpasssignofJWT"

//Route 1: create a user using: POST '/api/auth/createuser'. No login required
router.post('/createuser',[
    body('name', 'Enter a valid name.').isLength({ min: 3 }),
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password must be at least of 5 characters.').isLength({ min: 5 }),
], async (req, res)=>{
    let success = false
    //If there are errors in validations send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //Check weather the user exist with the same mail id 
    try {
        
    //await till it resolved.
    let user = await User.findOne({email:req.body.email})
    if (user){
        return res.status(404).json({success, error:"Sorry! User already exists with the same mail ID."})
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
    success = true
    res.json({success, authToken})
    }
    catch (error) {
       console.error(error.message);
       res.status(500).send('Internal server error occured') 
    }
})



//Route 2: Login authentication using: POST '/api/auth/login'. No login required
router.post('/login',[
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password cannot be blank.').exists(),
    // body('password', 'Password must be at least of 5 characters.').isLength({ min: 5 }),
], async (req, res)=>{
    let success = false
    //If there are errors in validations send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{email, password} = req.body;
    try {
        let user = await User.findOne({email})
        //if user mail in incorrect
        if(!user){
            success = false
            return res.status(500).send({error:"Please try to login with correct mail ID."})
        }
        let passwordCompare = await bcrypt.compare(password, user.password);
        //if user mail in incorrect
        if(!passwordCompare){
            success = false
            return res.status(500).send({success, error:"Please try to login with credentials."})

        }

        //if both correct
        const data = {
            user:{
                id:user.id
            }
        } 
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true
        //sending the authentication token
        res.json({success, authToken})
        


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error occured') 
    }
})

//Route 3: Get Login user details: POST '/api/auth/getuser'. Login Required!
//here fetchuser is middleware which we import from other file
router.post('/getuser',fetchuser, async (req, res)=>{
    try {
        let userID = req.user.id;
        const user = await User.findById(userID).select('-password');
        res.send(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error occured') 
    }
})

module.exports = router