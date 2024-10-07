"use client"

import { AppShell } from "@mantine/core";
import Navbar from "./nav/Navbar";
import { IconCat, IconDashboard, IconNote, IconUserSearch } from "@tabler/icons-react";
import { LinkProps, LinksGroupProps } from "~/types";
import { useDisclosure } from "@mantine/hooks";

const linkData: (LinkProps | LinksGroupProps)[] = [
    { link: "/", label: "Dashboard", icon: IconDashboard },
    { link: "/cats", label: "Cats", icon: IconCat },
    { link: "/notes", label: "Notes", icon: IconNote },
    { link: "/researchers", label: "Researchers", icon: IconUserSearch },
];
  
const Body = (props: {children: React.ReactNode }) => {
    const [opened] = useDisclosure();
    const { children } = props;

    return (
        <AppShell
            navbar={{
                width: { base: 200, md: 300, lg: 400 },
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Navbar p="md">
                <Navbar linkData={linkData}/>
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    )
}

export default Body;