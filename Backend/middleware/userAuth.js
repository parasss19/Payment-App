import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const {token} = req.cookies;

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: "Not authorized" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;   //already signed 
    req.userId = decoded.userId || decoded.sub;
    next();
  } 
  catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Invalid or expired token",
    });
  }
};

export default userAuth;
