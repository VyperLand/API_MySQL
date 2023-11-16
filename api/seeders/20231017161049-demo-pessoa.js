'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pessoas', [
      {
        nome: 'John Doe',
        ativo: true,
        email: "john@email.com",
        role: "estudante",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Jose Junior',
        ativo: false,
        email: "Jose@email.com",
        role: "estudante",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Maria Marta',
        ativo: true,
        email: "Maria@email.com",
        role: "estudante",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Jubiscreisson Melo',
        ativo: true,
        email: "Jubiscreisson@email.com",
        role: "professor",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Joana Silva',
        ativo: false,
        email: "Joana@email.com",
        role: "professor",
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pessoas', null, {});
  }
};
