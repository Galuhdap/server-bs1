'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SuperAdmins', {
      kode_super_admin: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nama_super_admin: {
        type: Sequelize.STRING
      },
      no_telp: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      kode_user: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('SuperAdmins');
  }
};