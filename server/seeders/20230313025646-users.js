'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('users', [{
      full_name: "William McGonagle",
      username: "william-mcgonagle",
      password: "gijeaigjea",
      email: "mcgonaglew@fairfieldprogramming.org",
      profile_picture: "fjeilafjlieajlf.com/afl3jifja.png",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});

  }
};
