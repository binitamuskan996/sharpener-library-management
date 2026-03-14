const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');

const BookIssue = sequelize.define('BookIssue', {

issuedAt:{
type:DataTypes.DATE,
allowNull:false
},
returnedOn:{
type:DataTypes.DATE
},
fine:{
type:DataTypes.INTEGER,
defaultValue:0
}
});

module.exports = BookIssue;