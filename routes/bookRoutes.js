const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth'); 

router.get('/all', auth, bookController.getAllBooks);
router.get('/search', auth, bookController.searchBooks);
router.post('/issue', auth, bookController.issueBook);
router.get('/my', auth, bookController.myBooks);
router.get('/return/:id', auth, bookController.returnedBook);
router.post('/pay/:id', auth, bookController.payFine);
router.get('/returned', auth, bookController.getReturnedBooks);

module.exports = router;