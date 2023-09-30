'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KasAdmins', {
      kode_kas_admin: {
        allowNull: false,
        unique:true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      kode_setor_sampah: {
        type: Sequelize.STRING
      },
      kode_susut_sampah_bs: {
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
    await queryInterface.dropTable('KasAdmins');
  }
};