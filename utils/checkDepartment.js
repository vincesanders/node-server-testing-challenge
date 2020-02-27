module.exports = (department) => {
    return (req,res, next) => {
        if (req.decodedToken && req.decodedToken.department && req.decodedToken.department.toLowerCase() === department) {
            next();
        } else {
            res.status(403).json({ message: 'You are not authorized to access this information.' });
        }
    }
}