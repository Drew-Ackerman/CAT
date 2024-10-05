import { useState } from "react";
import { Group, Box, Collapse, Text, UnstyledButton, rem } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./Navbar.module.css";
import type { LinksGroupProps } from "~/types";
import Link from "next/link";

export function LinksGroup({ icon: Icon, label, initiallyOpened, childLinks }: LinksGroupProps) {
  const [opened, setOpened] = useState(initiallyOpened ?? false);
  const items = childLinks.map((link) => (
    <Link href={link.link} key={link.label}>
      <Group className={classes.childLink}>
        <Text> {link.label} </Text>
        <link.icon className={classes.icon}></link.icon>
      </Group>
    </Link>
  ));

  //Return the whole link group
  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.parentLink}>
        <Group className={classes.icon} justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Icon stroke={1.5} className={classes.linkIcon} />
            <Box>{label}</Box>
          </Box>
          <IconChevronRight
            className={classes.chevron}
            stroke={1.5}
            style={{
              width: rem(16),
              height: rem(16),
              transform: opened ? "rotate(-90deg)" : "none",
            }}
          />
        </Group>
      </UnstyledButton>
      <Collapse in={opened}>{items}</Collapse>
    </>
  );
}
