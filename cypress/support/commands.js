// preenche os campos obrigatorios e submete 
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Felipe');
    cy.get('#lastName').type('Accyole');
    cy.get('#email').type('teste@email.com');
    cy.get('#open-text-area').type('devolvendo meu dinheiro');
    cy.contains('button', 'Enviar').click();
});