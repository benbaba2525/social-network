const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require('../models/user');



exports.signup = async (req, res) => {
    const userExists = await User.findOne({email: req.body.email})
    if(userExists)
       return res.status(403).json({
        error: "Email is taken!!"
    });
    const user = await new User(req.body)
    await user.save()
    res.status(200).json({ message: "Sign up successful. Please log in " });
};

exports.signin = (req, res) => {

    //Find the user based on the email
    const {email, password} = req.body
    User.findOne({email}, (err, user) => {
         //If error or no user
        if(err || !user) {
            return res.status(401).json({
                error: "User with that email does not exist. Please try again"
            })
        }
        //If user is found make sure the email and password match
        //Create authenticate method in model and use here
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email or Password do not match. Please try again"
            })
        }
       // Generate a token with user ID and secret
             const token = jwt.sign({_id: user._id}, process.env.JWT_SECERT);
       //Persist the token as "t" in cookie with expire date
             res.cookie("t", token, {expire: new Date( + 9999)})
       //Return response with user and token to frontend client
             const {_id, name, email} = user 
             return res.json({token, user: {_id, email, name}});
    })
   

   

   
} ;