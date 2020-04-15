const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/') // uploads라는 폴더 생성하고 저장
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`) // ex) 1220001309139_hello
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single("file"); // 파일 하나만

router.post('/uploadImage', function(req, res) {
    //이미지를 서버에 저장
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
});

router.post('/uploadProduct', function(req, res) {

    // save all the data we got from the client into the database
    const product = new Product(req.body);

    product.save(err => {
        if(err) return res.status(400).json({success: false});
        return res.status(200).json({success: true});
    })
});

module.exports = router;
