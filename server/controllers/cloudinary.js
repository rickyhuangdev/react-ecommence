const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET_KET,
    secure: true
})
exports.upload = async (req, res) => {
    await cloudinary.uploader.upload(req.body.image, function (error, result) {
        if (result) {
            return res.json(result)
        } else {
            return res.json(error)
        }


    })
}
exports.remove = (req, res) => {
    let image_id = req.body.public_id
    cloudinary.uploader.destroy(image_id, (err, result) => {
        if (err) return res.json({success:false,err})
        res.json(result)
    })
}

