// models/Order.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming your sequelize instance is configured here

class Order extends Model {}

Order.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyName: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    streetAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    townCity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pinCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending', // Default status
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    sequelize,
    modelName: 'Order',
});

module.exports = Order;
