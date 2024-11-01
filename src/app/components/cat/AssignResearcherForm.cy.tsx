import type { ICat, IUser } from '~/types';
import AssignResearcherForm from './AssignResearcherForm';

describe('<AssignResearcherForm />', () => {

    const cat: ICat = {
        id: 0,
        name: 'Mooney',
        tag: 'CAT-0001',
        color: 'White',
        sex: false,
        researcherId: 0
    }

    const researchers: Array<IUser> = [
        {
            id: 0,
            name: "Admin",
            email: "admin@cats.com",
            image: "",
            role: "admin",
        },
        {
            id: 1,
            name: "User",
            email: "user@cats.com",
            image: "",
            role: "user",
        }
    ]

    it("The researchers names are shown", () => {
        cy.mount(<AssignResearcherForm selectedCat={cat} researchers={researchers}/>);
        cy.getByTestId("researcherSelect").click()
        cy.get(".mantine-Select-dropdown").contains("Admin");
        cy.get(".mantine-Select-dropdown").contains("User");
    });

    it('After a researcher is selected, a notification is shown on success', () => {
        cy.intercept("/api/cats/**/researcher", { status: 200 })
        cy.mount(<AssignResearcherForm selectedCat={cat} researchers={researchers}/>);
        cy.getByTestId("researcherSelect").click()
        cy.get(".mantine-Select-dropdown").contains("Admin").click();
        cy.get("#saveButton").click();
        cy.get(".mantine-Notification-body").should("include.text", "Save Successful");
        cy.get(".mantine-Notification-body").should("include.text", "Assigned researcher to cat");
    });

    it("Errored submissions have a notification", () => {
        cy.intercept("/api/cats/**/researcher", { statusCode: 400 })
        cy.mount(<AssignResearcherForm selectedCat={cat} researchers={researchers}/>);
        cy.getByTestId("researcherSelect").click()
        cy.get(".mantine-Select-dropdown").contains("User").click();
        cy.get("#saveButton").click();
        cy.get(".mantine-Notification-body").should("include.text", "Save Failed");
        cy.get(".mantine-Notification-body").should("include.text", "Could not assign researcher to cat");
    });
});
