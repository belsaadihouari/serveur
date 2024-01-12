const jwt = require("jsonwebtoken");
const Mydata = require("../models/UserSchema");
require("dotenv").config();
const Mydatatoken = require("../models/tokenSchema");
 function verifiToken(req, res, next) {
  const tokenUrl = req.query.token;
  if (tokenUrl) {
    jwt.verify(tokenUrl, process.env.KEY_JWT, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token not valid" });
      } else {
        const user = await Mydatatoken.findOne({ iduser: decoded.id });
        if (!user) {
          return res.status(409).json({ error: "Email already verified" });
        } else if (user.stocktoken == tokenUrl) {
          req.id = {
            iduser: decoded.id,
          };
          next();
          
        } else {
          // Gérer d'autres cas non prévus
          return res.status(500).json({ error: "Erreur lors de la confirmation de l'email" });
        }
      }
    });
  } else {
    return res.status(400).json({ error: "Token not found" });
  }
}

const ratingcheck = (req, res, next) => {
  
  const token = req.cookies.jwt;
  
  if (token) {
    jwt.verify(token, process.env.KEY_TOKEN, async (err, decoded) => {
      if (err) {
      res.status(500).json({ error: "Internal Server Error" }); 
      return  
      } else {
        const currentUser = await Mydata.findById(decoded.id);
        
        req.id = {
          iduser: decoded.id,
          newrating:req.body.rating,
        };
        next()
      }
    });
  } else {
   return res.status(500).json({ error: "Internal Server Error" });
   
  }
};
const pingro = (req, res, next) => {
  res.status(200).json({success:"true"})
 }

const checkIfUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.KEY_TOKEN, async (err, decoded) => {
      if (err) {
      res.status(500).json({ error: "Internal Server Error" }); 
      return  
      } else {
        const currentUser = await Mydata.findById(decoded.id);
        res.json({ user: currentUser });
        return
      }
    });
  } else {
   return res.status(500).json({ error: "Internal Server Error" });
   
  }
};
module.exports = { verifiToken, checkIfUser,ratingcheck,pingro };
