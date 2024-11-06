import Link from "next/link";
import classes from "./Navbar.module.css";
import type { LinkProps } from "~/types";
import type { Dispatch, SetStateAction } from "react";

interface NavbarLinkProps {
    item: LinkProps,
    onClick: Dispatch<SetStateAction<string>>,
    isActive: boolean | undefined,
}

const NavbarLink = ({item, onClick, isActive}: NavbarLinkProps) => {
    return ( 
        <Link
            test-id="navbarLink"
            className={classes.link}
            data-active={isActive}
            href={`${item.link}`}
            key={item.label}
            onClick={() => { onClick(item.label) }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    )
}

export default NavbarLink;