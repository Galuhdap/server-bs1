'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JenisSampahKerings', {
      kode_sampah: {
        allowNull: false,
        unique:true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      jenis_sampah: {
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
    await queryInterface.dropTable('JenisSampahKerings');
  }
};