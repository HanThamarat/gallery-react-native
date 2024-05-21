const express = require('express');
const router = express.Router();
const conn = require('../configs/mysqlConn');
const bcrypt = require('bcrypt');

/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Create a new user
 *     parameters:
 *       - in: body
 *         name: publication
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *         description: user object
 *     responses:
 *       201:
 *         description: created user successfully
 *       401:
 *         description: created user fiald
 */
router.post('/create', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashPassword = bcrypt.hashSync(password, 10);

        const [ results ] = await conn.execute("INSERT INTO users(username, email, password) VALUES(?,?,?)",
        [username, email, hashPassword],
        (err, result, field) => {
            if (err) {
                throw `inset err: ${err}`
            }
        });

        return res.status(201).json({ message: 'create user successfully', body: results, });

    } catch (err) {
        return res.status(401).json({
            massage: 'authentication faild',
            err: err,
        });
    }
});

router.post('/sign-in', async (req, res) => {
    try {
        const { email, password } = req.body;

        const [ results ] = await conn.execute("SELECT * FROM users WHERE LOWER(email) = LOWER(?)", [email], 
        (err, result, field) => {
            if (err) {
                throw `auth err : ${err}`; 
            }
        });

        const checkPassword = bcrypt.compareSync(password, results[0].password);

        if (results.length == 0 || results.length > 1) {
            throw 'กรุณาตรวจสอบอีเมลของคุณ'
        }
        
        if (checkPassword != true) {
            throw 'ดรุณาตรวจสอบรหัสผ่าน'
        }

        return res.status(201).json({ massage: 'authentication successfully', body: results });

    } catch (err) {
        return res.status(401).json({
            massage: 'authentication faild',
            err: err,
        });
    }
});

router.get('/userData/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const [ results ] = await conn.query("SELECT * FROM users WHERE id = ?", 
        [userId],
        (err, result, field) => {
            if(err) {
                throw 'get data faild'
            }
        });

        if (results.length == 0 || results.length > 1) {
            throw 'กรุณาตรวจสอบบัญชีของท่าน'
        }

        return res.status(200).json({ message: 'get userdata successfully', body: results })
    } catch (error) {
        return res.status(500).json({ message: 'get data fiald', err: error })
    }
});

module.exports = router;