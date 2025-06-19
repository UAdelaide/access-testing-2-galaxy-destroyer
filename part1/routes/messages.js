var express = require('express');
var router = express.Router();
var db = require('../db');

var CURRENT_BUYER_ID = 1;
var CURRENT_SELLER_ID = 2;


// routes to create for api: 1. for items, 2. post messages, 3. get messages

router.get('/items', async(req,res) => {
    const [rows] = await db.query(`
        SELECT bl.bookID, bl.title, u.name AS sellerName
        FROM bookstatus bl
        JOIN bookinfo bi ON bl.bookinfoID = bi.bookinfoID
        JOIN users u ON bl.sellerID = u.userID`
    );
    res.json(rows);
});


module.exports = router;