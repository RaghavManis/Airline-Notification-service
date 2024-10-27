'use strict';
/** @type {import('sequelize-cli').Migration} */
const { Enums } = require("../utills/common") ;
const { INITIATED , BOOKED , CANCELLED , PENDING } = Enums.BOONIKG_STATUS ;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER , 
      },
      subject: {
        type: Sequelize.STRING ,
        allowNull : false ,
      },
      content: {
        type: Sequelize.STRING ,
        allowNull : false ,
      },
      recepientEmail: {
        type: Sequelize.STRING ,
        allowNull : false ,
      },
      status: {
        type: Sequelize.ENUM ,
        values : [INITIATED , BOOKED , CANCELLED , PENDING] ,
        defaultValue : INITIATED,
        allowNull : false ,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};