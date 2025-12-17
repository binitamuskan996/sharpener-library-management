const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

router.post('/issue', bookController.issueBook);

router.get('/issued',bookController.getIssuedBooks);

router.get('/returned', bookController.getReturnedBooks);

router.get('/return/:id', bookController.returnedBook);

router.post('/pay/:id', bookController.payFine);

module.exports = router;
