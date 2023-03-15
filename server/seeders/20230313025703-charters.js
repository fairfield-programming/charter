'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('charters', [{
      name: "Greens Farms Academy",
      description: "lorem ipsum",
      data: JSON.stringify({}),
      icon: "fiejailfjea.com/giejalgea.png",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('charters', null, {});
  
  }
};
