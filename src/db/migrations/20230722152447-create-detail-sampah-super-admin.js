'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailSampahSuperAdmins', {
      kode_detail_sampah: {
        allowNull: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      kode_super_admin: {
        allowNull: true,
        type: Sequelize.STRING
      },
      berat: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      saldo: {
        allowNull: true,
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('DetailSampahSuperAdmins');
  }
};