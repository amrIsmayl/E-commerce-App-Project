const multer = require('multer')
const AppError = require('./AppError')

exports.uploadSingleFile = (fieldName, folderName) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '-' + file.originalname)
        }
    })

    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) { // el mimeType: goze2 mogod fe el object fe el console.log(file)
            cb(null, true)
        } else {
            cb(new AppError("images only", 400), false) // handle errors mkan el null 
        }
    }

    const upload = multer({ storage, fileFilter })
    return upload.single(fieldName)
}


exports.uploadMixOfFiles = (arrayOfFields, folderName) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '-' + file.originalname)
        }
    })

    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) { // el mimeType: goze2 mogod fe el object fe el console.log(file)
            cb(null, true)
        } else {
            cb(new AppError("images only", 400), false) // handle errors mkan el null 
        }
    }

    const upload = multer({ storage, fileFilter })
    return upload.fields(arrayOfFields) // why fields not array because array to one input field, but fields to more than one input field
}