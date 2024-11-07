import React from 'react'
import NoteCard from './NoteCard'
import type { INotes } from '~/types'

describe('<NoteCard />', () => {
  beforeEach(() => {
    const data: INotes = {
      id: 0,
      text: "Very Adorable",
      catId: 1,
      researcherId: 1,
      temperament: 10,
      radioactivity: 10,
      timestamp: new Date(Date.now()),
    }
    cy.mount(<NoteCard data={data}/>)
  })

  it('Clicking the note card opens more details', () => {
    cy.getByTestId("noteCard").click();
    cy.getByTestId("viewNoteModal").find("header").should("have.text", "10/17/2024, 11:03:29 AM");
    cy.getByTestId("viewNoteModal").find("p").should('have.text', "Very Adorable");
  });

  it('Radiation icons show value on hover', () => {
    cy.getByTestId("radioactiveIcon").trigger('mouseenter');
    cy.getByTestId('radioactivityTooltip').should("be.visible").and("have.text", "Radioactivity: 10");
  });
  
  it('Temperament icons show value on hover', () => {
    cy.getByTestId("temperamentIcon").trigger('mouseenter');
    cy.getByTestId('temperamentTooltip').should("be.visible").and("have.text", "Temperament: 10");
  });
});
