'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CatatPengeluaranAdmins', {
      kode_pengeluaran: {
        allowNull: false,
        unique:true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nama_pengeluaran: {
        type: Sequelize.DOUBLE
      },
      harga: {
        type: Sequelize.DOUBLE
      },
      catatan: {
        type: Sequelize.STRING
      },
      kode_admin: {
        allowNull: true,
        type: Sequelize.STRING
      },
      kode_super_admin: {
        allowNull: true,
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
    await queryInterface.dropTable('CatatPengeluaranAdmins');
  }
};