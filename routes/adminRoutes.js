const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/add-books',auth,adminController.addBook);

router.get('/get-books',auth,adminController.getBooks);

router.get('/fine-report',auth,adminController.fineReport);
router.get('/issue-report',auth,adminController.issueReport);

router.get('/users',auth,adminController.getUsers);
router.put('/change-role', auth, adminController.changeRole);
router.put('/update-book/:id', auth, adminController.updateBook);
router.delete('/delete-book/:id', auth, adminController.deleteBook);

module.exports = router;