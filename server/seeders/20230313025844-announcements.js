'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('charters', [{
      userId: 1,
      charterId: 1,
      title: "New Announcement",
      content: "This is an announcement.",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('announcements', null, {});
    
  }
};
