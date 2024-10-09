"use client";

import { useState } from "react";
import { Group, Code } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import classes from "./Navbar.module.css";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LinksGroup } from "./NavbarLinksGroup";
import type { LinkProps, LinksGroupProps } from "~/types";

const Navbar = (props: { linkData: (LinksGroupProps | LinkProps)[] }) => {
  const [active, setActive] = useState("Dashboard");
  const { linkData } = props;

  const links = linkData.map((item) => {
    if (isLinkGroup(item)) {
      return <LinksGroup {...item} key={item.label} />;
    }
    return (
      <Link
        className={classes.link}
        data-active={item.label === active || undefined}
        href={`${item.link}`}
        key={item.label}
        onClick={() => {
          setActive(item.label);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </Link>
    );
  });

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Link href="/">
            <h1>C.A.T</h1>
          </Link>
          <Code fw={700}>v0</Code>
        </Group>
        {links}
      </div>
      {createNavFooter()}
    </nav>
  );
};

export default Navbar;

function createNavFooter() {
  return (
    <div className={classes.footer}>
      <Link
        href="/api/auth/logout"
        className={classes.link}
        onClick={async (event) => {
          event.preventDefault();
          await signOut();
        }}
      >
        <IconLogout className={classes.linkIcon} stroke={1.5} />
        <span>Logout</span>
      </Link>
    </div>
  );
}

function isLinkGroup(input: LinkProps | LinksGroupProps): input is LinksGroupProps {
  return "childLinks" in input;
}
