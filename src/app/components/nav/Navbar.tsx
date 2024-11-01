"use client";

import { useState } from "react";
import { Group, Code } from "@mantine/core";
import { IconLogin, IconLogout } from "@tabler/icons-react";
import classes from "./Navbar.module.css";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { LinksGroup } from "./NavbarLinksGroup";
import type { LinkProps, LinksGroupProps } from "~/types";
import NavbarLink from "./NavbarLink";

interface NavBarProps {
  linkData: Array<LinksGroupProps | LinkProps>,
  authStatus: string, 
}

const Navbar = (props: NavBarProps) => {
  const [active, setActive] = useState("Dashboard");
  const { linkData, authStatus} = props;
  
  const links = linkData.map((item) => {
    if (isLinkGroup(item)) {
      return <LinksGroup {...item} key={item.label} />;
    }
    return <NavbarLink item={item} onClick={setActive} isActive={item.label === active || undefined} key={item.label}/>
  });

  const loginLink = (
    <Link
      test-id="loginLink"
      href="/api/auth/signin"
      className={classes.link}
      onClick={async (event) => {
        event.preventDefault();
        await signIn();
      }}
    >
      <IconLogin className={classes.linkIcon} stroke={1.5} />
      <span>Login</span>
    </Link>
  )

  const logoutLink = ( 
    <Link 
      test-id="logoutLink"
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
  );

  return (
    <nav test-id="navbar" className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Link href="/">
            <h1>C.A.T</h1>
          </Link>
          <Code fw={700}>v0</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        {authStatus !== "authenticated" && loginLink}
        {authStatus === "authenticated" && logoutLink}
      </div>
    </nav>
  );
};

export default Navbar;

function isLinkGroup(input: LinkProps | LinksGroupProps): input is LinksGroupProps {
  return "childLinks" in input;
}
