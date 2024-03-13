const validateUserAuth = (req,res,next) => {
    if(!req.body.email || !req.body.password)
    {
        return res.status(400).json({
            success: false,
            data: {},
            message: "something went wrong in providing the data by the user",
               err: "email or password missing"     
        })
    }
    next();
}
module.exports = {
    validateUserAuth
}