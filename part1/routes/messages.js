var express = require('express');
var router = express.Router();
var db = require('../db');

var CURRENT_BUYER_ID = 1;
var CURRENT_SELLER_ID = 2;


// routes to create for api: 1. for items, 2. post messages, 3. get messages

router.get('/items', async(req,res) => {
    const [rows] = await db.query(`
        SELECT bl.book`)
});