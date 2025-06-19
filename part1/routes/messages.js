var express = require('express');
var router = express.Router();
var db = require('../db');

var CURRENT_BUYER_ID = 1;

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

router.get('/messages', async (req,res) => {
    const [rows] = await db.query(
        `SELECT m.messageData, m.timeSent, bi.title,u.name AS buyerName
        FROM messages m
        JOIN bookstatus bl ON m.bookID = bl.bookID
        JOIN bookinfo bi ON bl.bookinfoID = bi.bookinfoID
        JOIN users u ON m.buyerID = u.userID
        WHERE m.sellerID = ?
        ORDER BY m.timeSent DESC`,
        [CURRENT_BUYER_ID]
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

module.exports = router;