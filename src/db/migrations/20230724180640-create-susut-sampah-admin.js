'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SusutSampahAdmins', {
      kode_susut_sampah_bs: {
        allowNull: false,
        unique:true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      berat: {
        type: Sequelize.DOUBLE
      },
      harga: {
        type: Sequelize.DOUBLE
      },
      catatan: {
        type: Sequelize.STRING
      },
      kode_admin_bs: {
        allowNull: true,
        type: Sequelize.STRING
      },
      kode_super_admin: {
        allowNull: true,
        type: Sequelize.STRING
      },
      kode_sampah: {
        allowNull: true,
        type: Sequelize.STRING
      },
      kode_barang: {
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
    await queryInterface.dropTable('SusutSampahAdmins');
  }
};