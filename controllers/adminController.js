const { Op } = require('sequelize');
const User = require('../models/userModel');
const Book = require('../models/bookModel');
const BookIssue = require('../models/bookIssueModel');

const addBook = async (req, res) => {
  try {
    const { bookName, author, totalCopies } = req.body;

    const book = await Book.create({
      bookName,
      author,
      totalCopies,
      availableCopies: totalCopies
    });

    res.json({ message: "Book added successfully", book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const issueReport = async (req, res) => {
  try {
    const books = await BookIssue.findAll({
      where: { returnedOn: null },
      include: [
        { model: Book, attributes: ["bookName"] },
        { model: User, attributes: ["name", "email"] }
      ]
    });

    const now = new Date();
    const report = books.map(book => {
      const hours = Math.ceil((now - new Date(book.issuedAt)) / (60 * 60 * 1000));
      const fine = hours > 1 ? (hours - 1) * 10 : 0;
      return {
        id: book.id,
        userName: book.User.name,
        email: book.User.email,
        bookName: book.Book.bookName,
        issuedAt: book.issuedAt,
        returnedOn: book.returnedOn,
        fine
      };
    });

    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const fineReport = async (req, res) => {
  try {
    const reports = await BookIssue.findAll({
      where: { returnedOn: { [Op.not]: null } },
      include: [
        { model: User, attributes: ["name", "email"] },
        { model: Book, attributes: ["bookName"] }
      ]
    });

    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email", "role"] });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const changeRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ message: "Role updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { availableCopies } = req.body;

    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.availableCopies = availableCopies;
    await book.save();

    res.json({ message: "Book updated successfully", book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    await Book.destroy({ where: { id } });

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  addBook,
  getBooks,
  issueReport,
  fineReport,
  getUsers,
  changeRole,
  updateBook,
  deleteBook
};