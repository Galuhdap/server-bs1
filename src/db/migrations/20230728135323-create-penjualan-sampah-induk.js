'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PenjualanSampahInduks', {
      kode_penjualan_induk: {
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
      total: {
        type: Sequelize.DOUBLE
      },
      catatan: {
        type: Sequelize.STRING
      },
      nama_pembeli: {
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
    await queryInterface.dropTable('PenjualanSampahInduks');
  }
};