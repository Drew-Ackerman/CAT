import { Tooltip, ActionIcon } from "@mantine/core";
import { IconMoodAngry, IconMoodAnnoyed, IconMoodSmile, IconMoodSmileBeam } from "@tabler/icons-react";

const TemperamentIcon = ({temperament}: {temperament: number}) => {
    let icon;
    let color;
  
    if (temperament <= 3) {
      icon = <IconMoodAngry />;
      color = "red";
    } else if (temperament > 3 && temperament <= 5) {
      icon = <IconMoodAnnoyed />;
      color = "orange";
    } else if (temperament > 5 && temperament <= 8) {
      icon = <IconMoodSmile />;
      color = "yellow";
    } else {
      icon = <IconMoodSmileBeam />;
      color = "green";
    }
  
    return (
      <Tooltip test-id="temperamentTooltip" label={`Temperament: ${temperament}`}>
        <ActionIcon test-id="temperamentIcon" color={color} size={34}>
          {icon}
        </ActionIcon>
      </Tooltip>
    );
}

export default TemperamentIcon;