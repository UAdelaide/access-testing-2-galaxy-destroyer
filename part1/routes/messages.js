var express = require('express');
var router = express.Router();
var db = require('../db');

var CURRENT_BUYER_ID = 1;
var CURRENT_SELLER_ID = 2;


// routes to create for api: 1. for items, 2. post messages, 3. get messages

router.get('/items', async(req,res) => {
    const [rows] = await db.query(`
        SELECT bl.bookID, bi.title, u.name AS sellerName, bl.sellerID
        FROM bookstatus bl
        JOIN bookinfo bi ON bl.bookinfoID = bi.bookinfoID
        JOIN users u ON bl.sellerID = u.userID`
    );
    res.json(rows);
});

router.post('/messages', async (req,res) => {
    const {bookID, sellerID, message} = req.body;

    await db.query(`INSERT INTO messages (buyerID, sellerID, bookID, messageData, timeSent) VALUES (?, ?, ?, ?, NOW())`,
            [CURRENT_BUYER_ID, sellerID, bookID,message] // this ensures we are actually sending message to current buyer
        );
        res.status(201).json({ message: 'Sent message. '});
});

router.get('/messages',{
    
});

module.exports = router;