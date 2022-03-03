const User = require("../models/user");

exports.saveAddress = async (req,res)=>{
    const userAddress = await User.findOneAndUpdate({email:req.user.email},{address:req.body.address}).exec()
    if(userAddress){
        res.json({
            success:true
        })
    }
}
