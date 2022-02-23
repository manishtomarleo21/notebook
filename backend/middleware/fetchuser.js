const jwt = require('jsonwebtoken');
//JWT signature
const JWT_SECRET = "ThisisthesecretadditionpasssignofJWT" //generally we do not hardcord it we put in env locale

const fetchuser = (req, res, next)=>{
    //get the user from the jwt token and add id to req object so we can get the user details.
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token."})
    }
    //verifying token with the secret code
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
        
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token."})
    }

    
}

module.exports = fetchuser;