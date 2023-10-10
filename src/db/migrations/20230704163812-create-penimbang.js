'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Penimbangs', {
      kode_penimbang: {
        allowNull: true,
        primaryKey: true,
        unique:true,
        type: Sequelize.STRING
      },
      nama_penimbang: {
        type: Sequelize.STRING
      },
      rt: {
        type: Sequelize.STRING
      },
      rw: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      no_telp: {
        type: Sequelize.STRING
      },
      kode_super_admin: {
        type: Sequelize.STRING
      },
      kode_admin: {
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
    await queryInterface.dropTable('Penimbangs');
  }
};