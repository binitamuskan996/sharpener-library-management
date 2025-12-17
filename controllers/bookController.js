const Books = require('../models/bookModel');
const { Op } = require('sequelize');


const getReturnedBooks = async (req, res) => {
  try {
    const books = await Books.findAll({
      where: {
        returnedOn: {
          [Op.not]: null
        }
      }
    });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getIssuedBooks = async (req, res) => {
  try {
    const books = await Books.findAll({
      where: {
        returnedOn: null
      }
    });
 const now = new Date();

    const booksWithFine = books.map(book => {
      const hours = Math.ceil((now - new Date(book.issuedAt)) / (60*60*1000));
      const fine = hours > 1 ? (hours - 1) * 10 : 0;
      return {
        ...book.dataValues,
        fine
      };
    });

    res.status(200).json(booksWithFine); 
 } catch (err) {
    res.status(500).send(err.message);
  }
};

const returnedBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Books.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const hours = Math.ceil(
      (new Date() - new Date(book.issuedAt)) / (60 * 60 * 1000)
    );

    const fine = hours > 1 ? (hours - 1) * 10 : 0;

    res.json({
      id: book.id,
      fine
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const payFine = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Books.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const hours = Math.ceil((new Date() - new Date(book.issuedAt)) / (60*60*1000));
    const fine = hours > 1 ? (hours - 1) * 10 : 0;
    book.fine = fine;
    book.returnedOn = new Date();

    await book.save();

    res.json({
      message: 'Book returned successfully',
      book
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const issueBook = async (req, res) => {
  try {
    const { bookName } = req.body;
const issuedAt=new Date();
 const returnedAt=new Date(issuedAt.getTime() + 60 * 60 * 1000);
    const book = await Books.create({
      bookName,
      issuedAt: issuedAt,
      returnedAt:returnedAt,
      fine: 0
    });

    res.status(201).json(book);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getReturnedBooks,
  getIssuedBooks,
  returnedBook,
  payFine,
  issueBook
};
