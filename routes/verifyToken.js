const jwt = require("jsonwebtoken")


const verifyToken = ( req, res, next) => {
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err,user) => {
            err && res.status(403).json("Invalid token!");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("You are not authenticated!")
    }
}

const verifyTokenAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed!")
        }
    })
}

//token for agent
const verifyTokenAndAgent = (req, res, next) => {
    verifyToken((req, res, () => {
        req.user.isAgent ? next()
        : res.status(4003).json("Not an agent")
    }))
}
//general token for agent and admin
const verifyTokenAgentAndAdmin = (req, res, next) => {
    verifyToken( req, res, () => {
        if(req.user.isAdmin || req.user.isAgent){
            next();
        }else{
            res.status(403).json("Not allowed")
        }
    })
}
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        req.user.isAdmin ? next() 
        : res.status(403).json("You are not allowed")
    })
}
module.exports ={
    verifyToken,
    verifyTokenAuthorization,
    verifyTokenAndAdmin,
    verifyTokenAndAgent,
    verifyTokenAgentAndAdmin
}