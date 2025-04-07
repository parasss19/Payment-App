const jwt = require('jsonwebtoken');

const userMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  //console.log(authHeader);

  //if user didn't provided authHeader(token) or incorrect autHeader in headers
  if(!authHeader || !authHeader.startsWith('Bearer')){
    return res.status(403).json({
      msg: "You are not authenticated or Signup/Signin first",
    })
  }
  
  //if user provided correct token then extract actual token without Bearer keyword
  const token = authHeader.split(" ")[1];
  //console.log(jwtToken);

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    //during signin we sign jwt using 'userId' and 'jwt_secret' ,so jwt contain userId
    //which we send back with req obj so that we can use userId in userId other req 
    req.userId = decoded.userId;  
    next();
  }catch (error) {
    res.status(403).json({
        msg: "Internal server error",
    });
  }
}

module.exports = userMiddleware;