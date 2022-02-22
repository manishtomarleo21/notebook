const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

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
    //creates a new user
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      
    //We using async await so we dont have to use then and catch
    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err)
    // res.json({error:'Please enter a unique value for email.'})});
    res.json(user)
    }
    catch (error) {
       console.error(error.message);
       res.status(500).send('Some error occured') 
    }
})

module.exports = router