'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TarikSaldoNasabahs', {
      kode_biaya: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      kode_tariksaldo: {
        type: Sequelize.STRING
      },
      nomor_invoice: {
        unique:true,
        type: Sequelize.STRING
      },
      jumlah_penarikan: {
        type: Sequelize.INTEGER
      },
      saldo_akhir: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      kode_nasabah: {
        type: Sequelize.STRING
      },
      kode_admin: {
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
    await queryInterface.dropTable('TarikSaldoNasabahs');
  }
};