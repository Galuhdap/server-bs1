'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailSampahNasabahs', {
      kode_detail_sampah: {
        allowNull: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      kode_nasabah: {
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
      berat_sekarang: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      saldo_sekarang: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      kode_admin: {
        allowNull: true,
        type: Sequelize.STRING
      },
      kode_penimbang: {
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
    await queryInterface.dropTable('DetailSampahNasabahs');
  }
}; 