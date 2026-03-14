const { Op } = require('sequelize');
const Book = require('../models/bookModel');
const BookIssue = require('../models/bookIssueModel');

const getReturnedBooks = async (req, res) => {
  try {
    const books = await BookIssue.findAll({
      where: {
        returnedOn: { [Op.not]: null },
        UserId: req.user.id
      },
      include: [{ model: Book, attributes: ["bookName"] }]
    });

    const result = books.map(b => ({
      id: b.id,
      bookName: b.Book.bookName,
      issuedAt: b.issuedAt,
      returnedOn: b.returnedOn,
      fine: b.fine
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const returnedBook = async (req, res) => {
  try {
    const { id } = req.params;

    const issue = await BookIssue.findByPk(id);
    if (!issue) {
      return res.status(404).json({ message: 'Book issue not found' });
    }

    const hours = Math.ceil((new Date() - new Date(issue.issuedAt)) / (60 * 60 * 1000));
    const fine = hours > 1 ? (hours - 1) * 10 : 0;

    res.json({ id: issue.id, fine });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const payFine = async (req, res) => {
  try {
    const { id } = req.params;

    const issue = await BookIssue.findByPk(id);
    if (!issue) return res.status(404).json({ message: "Book issue not found" });

    const hours = Math.ceil((new Date() - new Date(issue.issuedAt)) / (60 * 60 * 1000));
    const fine = hours > 1 ? (hours - 1) * 10 : 0;

    issue.fine = fine;
    issue.returnedOn = new Date();
    await issue.save();

    const book = await Book.findByPk(issue.BookId);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    res.json({ message: "Book returned", fine });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const issueBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.availableCopies <= 0) return res.status(400).json({ message: "No copies available" });

    const issue = await BookIssue.create({
      BookId: bookId,
      UserId: req.user.id,
      issuedAt: new Date()
    });

    book.availableCopies -= 1;
    await book.save();

    res.json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const myBooks = async (req, res) => {
  try {
    const books = await BookIssue.findAll({
      where: { UserId: req.user.id, returnedOn: null },
      include: [{ model: Book, attributes: ["bookName"] }]
    });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    const books = await Book.findAll({
      where: { bookName: { [Op.like]: `%${q}%` } }
    });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getReturnedBooks,
  returnedBook,
  payFine,
  issueBook,
  getAllBooks,
  myBooks,
  searchBooks
};