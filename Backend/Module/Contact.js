const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Assuming you have your database connection configured in `db.js`

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'Contacts',  // Name of the table in MySQL
  timestamps: true        // This will add createdAt and updatedAt columns
});

module.exports = Contact;
