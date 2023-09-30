'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SetorSampahs', {
      kode_setor: {
        allowNull: true,
        primaryKey: true,
        unique:true,
        type: Sequelize.STRING
      },
      berat: {
        type: Sequelize.DOUBLE
      },
      total: {
        type: Sequelize.DOUBLE
      },
      catatan: {
        type: Sequelize.STRING
      },
      kode_nasabah: {
        allowNull: true,
        type: Sequelize.STRING
      },
      kode_admin: {
        allowNull: true,
        type: Sequelize.STRING
      },
      kode_penimbang: {
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
    await queryInterface.dropTable('SetorSampahs');
  }
};