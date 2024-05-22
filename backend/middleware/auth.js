const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

// const authenticateJwt = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

function authenticateJwt(req,res,next){
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token,SECRET,(err,decode)=>{
      if(err) return  res.send({
          message:"Token is not valid please login",
          status:2
      })
      if(decode){
          req.body.publishedBy= decode.user;
          next()
      }else{
          res.send({
              message:"Token is not valid please login",
              status:2
          })
      }
  })  
};

module.exports = {
    authenticateJwt,
}