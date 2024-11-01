import React from 'react'
import Navbar from './Navbar';
import { IconDashboard } from '@tabler/icons-react';

describe('<NavBar />', () => {

    it("Links are visible, have a label, and an icon", () => {
        const linkData = [
            { link: "/", label: "Home", icon: IconDashboard},
        ]
        cy.mount(<Navbar linkData={linkData} authStatus='authenticated'/>);
        cy.contains('a', "Home").should("have.attr", "href", "/")
        cy.contains('a', "Home").find("svg").should("have.class", "tabler-icon-dashboard");
    })

    it('Logout appears if user is authenticated', () => {
        cy.mount(<Navbar linkData={[]} authStatus='authenticated'/>);
        cy.getByTestId("logoutLink").should("be.visible").and("have.text", "Logout");
    });

    it('Login appears if user is not authenticated', () => {
        cy.mount(<Navbar linkData={[]} authStatus='unauthenticated'/>);
        cy.getByTestId("loginLink").should("be.visible").and("have.text", "Login");
    });
});
