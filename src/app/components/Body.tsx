"use client";

import { AppShell } from "@mantine/core";
import Navbar from "./nav/Navbar";
import { IconCat, IconDashboard, IconNote, IconUserSearch } from "@tabler/icons-react";
import type { LinkProps, LinksGroupProps } from "~/types";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";

const adminLinkData: (LinkProps | LinksGroupProps)[] = [
  { link: "/", label: "Dashboard", icon: IconDashboard },
  { link: "/cats", label: "Cats", icon: IconCat },
  { link: "/notes", label: "Notes", icon: IconNote },
  { link: "/researchers", label: "Researchers", icon: IconUserSearch },
];

const userLinkData: (LinkProps | LinksGroupProps)[] = [
  { link: "/", label: "Dashboard", icon: IconDashboard },
];

const Body = (props: { children: React.ReactNode }) => {
  const [opened] = useDisclosure();
  const session = useSession();
  const { children } = props;

  const linkData = session.data?.user.role === "admin" ? adminLinkData : userLinkData;

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
        <Navbar linkData={linkData} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Body;
