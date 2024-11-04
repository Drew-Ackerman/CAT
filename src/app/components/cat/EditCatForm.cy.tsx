import { ICat } from "~/types";
import EditCatForm from "./EditCatForm";


describe("<EditCatForm />", () => {

    const cat: ICat = {
        id: 0,
        name: "Mooney",
        tag: "CAT-0001",
        color: "White",
        sex: false,
        researcherId: 0
    }

    it("Name, tag, color, and sex have initial values set", () => {
        cy.mount(<EditCatForm selectedCat={cat}/>);
        cy.get("#nameTextInput").should("have.value", cat.name);
        cy.get("#tagTextInput").should("have.value", cat.tag);
        cy.get("#colorTextInput").should("have.value", cat.color);
        cy.getByTestId("female").should("be.checked");
        cy.getByTestId("male").should("not.be.checked");
    });

    it("Name, tag, color, are required", () => {
        cy.mount(<EditCatForm selectedCat={cat}/>);
        cy.get("#nameTextInput").clear()
        cy.get("#tagTextInput").clear()
        cy.get("#colorTextInput").clear()
        cy.get("#submitButton").click();

        cy.get("#nameTextInput-error").should("have.text", "Name is required");
        cy.get("#tagTextInput-error").should("have.text", "Tag is required");
        cy.get("#colorTextInput-error").should("have.text", "Color is required");
    });

    it.skip("Successful submissions have a notification", () => {
        cy.intercept("/api/cats/**", cat)
        cy.mount(<EditCatForm selectedCat={cat}/>);
        cy.get("#submitButton").click();
        cy.get(".mantine-Notification-body").should("include.text", "Edit Successful");
        cy.get(".mantine-Notification-body").should("include.text", `Edit cat ${cat.tag}`);
    });

    it("Errored submissions have a notification", () => {
        cy.intercept("/api/cats/**", { statusCode: 400 })
        cy.mount(<EditCatForm selectedCat={cat}/>);
        cy.get("#submitButton").click();
        cy.get(".mantine-Notification-body").should("include.text", "Save Failed");
        cy.get(".mantine-Notification-body").should("include.text", "Could not edit");
    })
})