/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', () => {
    const THREE_SECONDS_IN_MS = 3000;

    beforeEach(() => cy.visit('./src/index.html'));
    it('verifica o titulo da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
        cy.title().should('include', 'Central');

    })

    it('preencha os campos obrigatorios e envia o formulário', () => {
        const longText = "preencha os campos obrigatorios e envia o formulário, preencha os campos obrigatorios e envia o formulário,preencha os campos obrigatorios e envia o formulário, preencha os campos obrigatorios e envia o formulário"
        cy.clock();

        cy.get('input[name="firstName"]').type('Felipe');
        cy.get('input[name="lastName"]').type('Accyole');
        cy.get('input[id="email"]').type('teste@email.com');
        cy.get('input[id="phone"]').type('83999887744');
        cy.get('textarea[id="open-text-area"]').type( longText, {delay: 0});

        cy.contains('button', 'Enviar').click();
        cy.get('.success').should('be.visible');

        cy.tick(THREE_SECONDS_IN_MS);
        cy.get('.success').should('not.be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulario com um email com formatação invalida', function(){
        cy.clock();

        cy.get('#firstName').type('Felipe');
        cy.get('#lastName').type('Accyole');
        cy.get('#email').type('teste.email.com');
        cy.get('#phone').type('83999887744');
        cy.get('#open-text-area').type('devolvendo meu dinheiro');

        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');

        cy.tick(THREE_SECONDS_IN_MS);
        cy.get('.error').should('not.be.visible');
    });

    it('campo telefone continua vazio quando preenchido com valor não numerico', ()=> {
        cy.get('#phone').type('abcdefgh').should('have.value', '');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {
        cy.clock();

        cy.get('#firstName').type('Felipe');
        cy.get('#lastName').type('Accyole');
        cy.get('#email').type('teste@email.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('devolvendo meu dinheiro');

        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');

        cy.tick(THREE_SECONDS_IN_MS);
        cy.get('.error').should('not.be.visible');

    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('input[name="firstName"]').type('Felipe').should('have.value', 'Felipe')
        .clear().should('have.value', '');

        cy.get('input[name="lastName"').type('Accyole').should('have.value', 'Accyole')
        .clear().should('have.value', '');

        cy.get('input[id="email"]').type('accyole@email.com').should('have.value', 'accyole@email.com')
        .clear().should('have.value', '');

        cy.get('input[id="phone"]').type('83999887744').should('have.value', '83999887744')
        .clear().should('have.value', '');
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock();
        
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');

        cy.tick(THREE_SECONDS_IN_MS);
        cy.get('.error').should('not.be.visible');
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.clock();

        cy.fillMandatoryFieldsAndSubmit(); 
        cy.get('.success').should('be.visible');

        cy.tick(THREE_SECONDS_IN_MS);
        cy.get('.success').should('not.be.visible');

    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube');
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria');
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog');
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type=radio][value="feedback"]').check()
        .should('have.value', 'feedback');   
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type=radio]').should('have.length' , 3)
        .each(($item) => {
            cy.wrap($item).check();
            cy.wrap($item).should('be.checked');
        });
    });

    it('marca ambos checkboxes, depois desmarca o ultimo', () => {
        cy.get('input[type="checkbox"]').check().should('be.checked')
        .last().uncheck().should('not.be.checked');   
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]').should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should((input) => {
            expect(input[0].files[0].name).to.equal('example.json');
        });
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]').should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should((input) => {
            expect(input[0].files[0].name).to.equal('example.json');
        });   
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile');
        cy.get('input[type="file"]')
        .selectFile('@sampleFile').should((input) => {
            expect(input[0].files[0].name).to.equal('example.json');
        }); 
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank');
        
    });

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click();

        cy.contains('Talking About Testing').should('be.visible');
    });

})