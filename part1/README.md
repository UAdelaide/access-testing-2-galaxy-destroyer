Put your files for part1 here 

1.5: 
SELECT b.title, b.author, p.purchasedOn FROM purchases p JOIN bookstatus bl ON p.bookID = bl.bookID JOIN bookinfo b ON bl.bookinfoID = b.bookinfoID WHERE p.buyerID = 1 AND p.purchasedOn >= CURDATE() - INTERVAL 30 DAY ORDER BY p.purchasedOn DESC;

