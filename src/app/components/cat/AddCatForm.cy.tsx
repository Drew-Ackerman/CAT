import AddCatForm from './AddCatForm';

describe('<AddCatForm />', () => {

    it('Name, tag, color, and sex are required', () => {
        cy.mount(<AddCatForm/>);
        cy.get("#submitButton").click();
        cy.get("#nameTextInput-error").should("have.text", "Name is required");
        cy.get("#tagTextInput-error").should("have.text", "Tag is required");
        cy.get("#colorTextInput-error").should("have.text", "Color is required");
        cy.get(".mantine-RadioGroup-error").should("have.text", "Sex is required");
    });

    it("Successful submissions have a notification", () => {
        cy.intercept("/api/cats", { statusCode: 200, body: {name: "Mooney", tag: "TAG-0001", color: "White", sex: true} })
        cy.mount(<AddCatForm/>);
        cy.get("#nameTextInput").type("Mooney");
        cy.get("#tagTextInput").type("TAG-0001");
        cy.get("#colorTextInput").type("White");
        cy.getByTestId("male").click();
        cy.get("#submitButton").click();
        cy.get(".mantine-Notification-body").should("include.text", "Save Successful");
        cy.get(".mantine-Notification-body").should("include.text", "Saved A New Entry");
    });

    it("Errored submissions have a notification", () => {
        cy.intercept("/api/cats", { statusCode: 400 })
        cy.mount(<AddCatForm/>);
        cy.get("#nameTextInput").type("Mooney");
        cy.get("#tagTextInput").type("TAG-0001");
        cy.get("#colorTextInput").type("White");
        cy.getByTestId("male").click();
        cy.get("#submitButton").click();
        cy.get(".mantine-Notification-body").should("include.text", "Save Failed");
        cy.get(".mantine-Notification-body").should("include.text", "Could not save the manual entry");
    })
});
