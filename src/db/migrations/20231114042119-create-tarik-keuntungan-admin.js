'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TarikKeuntunganAdmins', {
      kode_tariksaldo: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nomor_invoice: {
        unique:true,
        type: Sequelize.STRING
      },
      jumlah_penarikan: {
        type: Sequelize.INTEGER
      },
      kode_admin: {
        type: Sequelize.STRING
      },
      kode_super_admin: {
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
    await queryInterface.dropTable('TarikKeuntunganAdmins');
  }
};