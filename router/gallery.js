const express = require('express');
const router = express.Router();
const multer = require('multer');
const conn = require('../configs/mysqlConn');
const bcrypt = require('bcrypt');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './img/gallery-image')
    },
    filename: function(req, file, callback) {
        const hashImage = bcrypt.hashSync(file.originalname, 10);
        callback(null, `${file.fieldname}_${Date.now()}_${hashImage}`)
    },
});

const upload = multer({ storage })

router.post('/createGallery', upload.single('photo'), async (req, res) => {
    try {
        const { title, sumary, userId } = req.body;
        const fileName = req.file.filename;
        const today = new Date();

        const [ results ] = await conn.execute("INSERT INTO gallery(title, sumary, userId, createAt, image) VALUES(?,?,?,?,?)",
        [ title, sumary, userId, today, fileName ],
        (err, result, field) => {
            if (err) {
                throw 'create gallery faild from database'
            }
        });

        return res.status(201).json({ massage: 'create gallery successfully', body: results });
    } catch (error) {
        return res.status(400).json({
            message: 'Create gallery faild',
            err: error
        });
    }
});

router.get('/allGallery', async (req, res) => {
    try {
        const [ results ] = await conn.query(`SELECT title, sumary, username, email FROM gallery INNER JOIN users ON gallery.userId = users.id`,
            [],
            (err, result, field) => {
                if (err) {
                    throw 'get allGallery faild from database'
                }
            });
            
        return res.status(200).json({ massage: 'get data gallery successfully', body: results });
    } catch (error) {
        return res.status(400).json({
            message: 'get allGallery faild',
            err: error
        });
    }
});

router.get('/getCountDate', async(req, res) => {
    try {
        const [ results ] = await conn.query(`SELECT title, sumary, userId, email, username,DATEDIFF(DATE_FORMAT(CURRENT_DATE(), '%Y-%m-%d'), DATE_FORMAT(createAt, '%Y-%m-%d')) AS countDate FROM gallery 
                                            INNER JOIN users ON gallery.userId = users.id
                                            WHERE DATEDIFF(DATE_FORMAT(CURRENT_DATE(), '%Y-%m-%d'), DATE_FORMAT(createAt, '%Y-%m-%d')) <= 1 `,
            [],
            (err, result, field) => {
                if (err) {
                    throw 'faild form database'
                }
            });

            return res.status(200).json({ massage: 'getdata successfully', body: results });
    } catch (error) {
        return res.status(400).json({
            massage: 'getCountDate faild',
            err: error
        });
    }
});

module.exports = router;