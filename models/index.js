const User = require('./userModel');
const Book = require('./bookModel');
const BookIssue = require('./bookIssueModel');


User.hasMany(BookIssue);
BookIssue.belongsTo(User);

Book.hasMany(BookIssue);
BookIssue.belongsTo(Book);