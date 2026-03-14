const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const Book = sequelize.define('Book', {
    bookName: DataTypes.STRING,
    author: DataTypes.STRING,
    totalCopies: DataTypes.INTEGER,
    availableCopies: DataTypes.INTEGER
});

module.exports = Book;