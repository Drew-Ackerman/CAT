import { Tooltip, ActionIcon } from "@mantine/core";
import { IconRadioactive } from "@tabler/icons-react";

const RadioactivityIcon = ({radioactivity}: {radioactivity: number}) => {
    let color;

    switch (radioactivity) {
      case 5:
        color = "lime.8";
        break;
      case 4:
        color = "lime.6";
        break;
      case 3:
        color = "lime.4";
        break;
      case 2:
        color = "lime.2";
        break;
      case 1:
        color = "lime.0";
        break;
    }
  
    return (
      <Tooltip test-id="radioactivityTooltip" label={`Radioactivity: ${radioactivity}`}>
        <ActionIcon test-id="radioactiveIcon" color={color} size={34}>
          <IconRadioactive />
        </ActionIcon>
      </Tooltip>
    );
}

export default RadioactivityIcon;