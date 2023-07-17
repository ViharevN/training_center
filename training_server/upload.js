const multer = require('multer');
const path = require('path');


//storage
const storage = multer.memoryStorage();

//filter downloading files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'audio/ogg' || file.mimetype === 'audio/mp3') {
        cb(null, true)
    }else {
        cb(null, false)
    }
}

// create multer object
const upload = multer({ storage });



module.exports = upload;