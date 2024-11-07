import type{ ICat, IUser } from "~/types";
import CatTable from "./CatTable";


describe("<CatTable />", () => {

    const cats: Array<ICat> = [
        {
            id: 0,
            name: "Mooney",
            tag: "CAT-0001",
            color: "White",
            sex: false,
            researcherId: 0,
        },
        {
            id: 1,
            name: "Smokey",
            tag: "CAT-0002",
            color: "Grey",
            sex: true,
            researcherId: 0,
        }
    ]

    const users: Array<IUser> = [
        {
            id: 0,
            name: "Drew",
            email: "admin@cats.com",
            image: null,
            role: "admin"
        }
    ]

    beforeEach(() => {
        const editRecord = cy.stub().as("editRecord");
        const assignResearcher = cy.stub().as("assignResearcher");
        const deleteRecord = cy.stub().as("deleteRecord");
        cy.mount(<CatTable cats={cats} users={users}/>)
    });
    
    it("Records contain the cat's name, tag, color, and sex.", () => {
        cats.forEach(cat => {
            cy.contains(cat.tag).parent("tr").as("record");
            cy.get("@record").contains(cat.name).should("be.visible");
            cy.get("@record").contains(cat.tag).should("be.visible");
            cy.get("@record").contains(cat.color).should("be.visible");
            cy.get("@record").contains(cat.sex ? "Male" : "Female").should("be.visible");
        });
    });

    it("Records can be edited", () => {
        cy.getByTestId("editRecordIcon").each((icon) => {
            icon.trigger("click");
        })
        cy.get("@editRecord").should("be.called");
    });

    it("Cat Profiles can be viewed", () => {
        cats.forEach(cat => {
            cy.contains(cat.tag).parent("tr").as("record");
            cy.get("@record").find("[test-id='profileLink']").should("have.attr", "href", `/cats/${cat.id}`);
        })
    });

    it("Cats can be assigned a researcher", () => {
        cy.getByTestId("actionMenu").each((menu) => {
            menu.trigger("click");
            cy.getByTestId("assignResearcherIcon").each((icon) => {
                icon.trigger("click");
            });
        });
        cy.get("@assignResearcher").should("be.called");
    });

    it("Records can be deleted", () => {
        cy.getByTestId("actionMenu").each((menu) => {
            menu.trigger("click");
            cy.getByTestId("deleteRecordIcon").each((icon) => {
                icon.trigger("click");
            })
        });
        cy.get("@deleteRecord").should("be.called");
    });
})