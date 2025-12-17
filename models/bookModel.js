const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const bookIssue = sequelize.define('bookissue', {
  bookName: { 
    type: DataTypes.STRING,
     allowNull: false
 },
   issuedAt: {
     type: DataTypes.DATE, 
     allowNull: false 
    }, 
   returnedAt: { 
    type: DataTypes.DATE,
     allowNull: true 
    },
    returnedOn:{
      type: DataTypes.DATE,
      allowNull: true 
    },
   fine: { 
    type: DataTypes.INTEGER,
     defaultValue: 0 
    }
});

module.exports = bookIssue;
