import React from 'react'
import type { ICat } from '~/types'
import CatInfoCard from './CatInfoCard';

describe('<CatInfoCard />', () => {
    const cat: ICat = {
        id: 1,
        name: 'Mooney',
        tag: 'CAT-0001',
        color: 'White',
        sex: false,
        researcherId: 1
    }

    it('Has a photo and name', () => {
        cy.mount(<CatInfoCard cat={cat}/>)
        cy.getByTestId("catInfoCard").find("img").should("be.visible");
        cy.getByTestId("catInfoCard").should("include.text", "Mooney");
    });

    it("Displays female gender", () => {
        cat.sex = false;
        cy.mount(<CatInfoCard cat={cat}/>)
        cy.getByTestId("catInfoCard").should("include.text", "Female");
    });

    it("Displays male gender", () => {
        cat.sex = true;
        cy.mount(<CatInfoCard cat={cat}/>)
        cy.getByTestId("catInfoCard").should("include.text", "Male");
    });
});
