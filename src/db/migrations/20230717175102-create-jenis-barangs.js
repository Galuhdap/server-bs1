'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JenisBarangs', {
      kode_barang: {
        allowNull: false,
        unique:true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      jenis_barang: {
        type: Sequelize.STRING
      },
      satuan: {
        type: Sequelize.INTEGER
      },
      harga_pertama: {
        type: Sequelize.DOUBLE
      },
      keuntungan_pertama: {
        type: Sequelize.DOUBLE
      },
      total_pertama: {
        type: Sequelize.DOUBLE
      },
      harga_kedua: {
        type: Sequelize.DOUBLE
      },
      keuntungan_kedua: {
        type: Sequelize.DOUBLE
      },
      total_kedua: {
        type: Sequelize.DOUBLE
      },
      kode_sampah: {
        type: Sequelize.STRING
      },
      kode_super_induk: {
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
    await queryInterface.dropTable('JenisBarangs');
  }
};