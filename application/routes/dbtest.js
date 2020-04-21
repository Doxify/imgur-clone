const express = require('express');
const router  = express.Router();
const db      = require('../conf/database');
const sg      = require('../conf/sendgrid');

router.get('/getUsers', (req, res, next) => {
    db.query('SELECT * FROM users', (err, result, fields) => {
        res.json(result);
    })

    // res.send('getting all posts');
});

router.get('/sendgridTest', async (req, res, next) => {
    const msg = {
        to: 'ageorgescu@mail.sfsu.edu',
        from: 'ageorgescu@mail.sfsu.edu',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    
    try {
        await sg.send(msg);
        res.send('Successfully sent message!')
    } catch(error) {
        res.json({
            message: 'An error occurred while sending email.',
            error: error
        });
    }
})


module.exports = router;