const jwt = require('jsonwebtoken');
const sql = require('mssql');

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;
    console.log(token,"token");
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded,"decoded");
        
        const { username,Role } = decoded;
        req.user = { username ,Role};
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        const { Role } = req.user;
        if (!roles.includes(Role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    }
}

module.exports = { authenticateUser, authorizePermissions };