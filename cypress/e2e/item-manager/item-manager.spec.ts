describe('Item Manager E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the list of items', () => {
    cy.get('.app-item-card').should('have.length.greaterThan', 0);
  });

  it('should search for items', () => {
    cy.get('input[id="search"]').type('Coche');
    cy.wait(500);
    cy.get('.app-item-card').should('have.length.greaterThan', 0);
    cy.get('.app-item-card').each(($el) => {
      cy.wrap($el).should('contain.text', 'Coche');
    });
  });

  it('should add items to favorites', () => {
    cy.get('.app-item-card')
      .first()
      .within(() => {
        cy.get('.app-item-card__favorite').click();
      });
    cy.wait(500);
    cy.get('.app-nav__button').click();
    cy.get('.favorites-modal__item').should('have.length', 1);
  });

  it('should open the favorites modal', () => {
    cy.get('.app-nav__button').click();
    cy.get('.favorites-modal').should('be.visible');
  });

  it('should remove items from favorites', () => {
    cy.get('.app-item-card')
      .first()
      .within(() => {
        cy.get('.app-item-card__favorite').click();
      });
    cy.wait(500);
    cy.get('.app-nav__button').click();
    cy.get('.favorites-modal__item').should('have.length', 1);
    cy.get('.favorites-modal__item-remove').first().click();
    cy.get('.favorites-modal__item').should('have.length', 0);
    cy.get('.favorites-modal__close').click();
  });
});
