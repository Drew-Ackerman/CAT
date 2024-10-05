import type { IconProps, Icon } from "@tabler/icons-react";
import type { RefAttributes } from "react";

export interface LinkProps {
  icon: React.FC<IconProps & RefAttributes<Icon>>;
  label: string;
  link: string;
}

export interface LinksGroupProps {
  icon: React.FC<IconProps & RefAttributes<Icon>>;
  label: string;
  childLinks: LinkProps[];
  initiallyOpened?: boolean;
}
