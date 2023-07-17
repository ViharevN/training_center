const easyYandexS3 = require('easy-yandex-s3').default;
const env = require('dotenv').config({path: './config/.env'});
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;


const s3 = new easyYandexS3({
    auth: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
    Bucket: 'verba-training-center',
     debug: true, // debug in console
});

module.exports = s3;