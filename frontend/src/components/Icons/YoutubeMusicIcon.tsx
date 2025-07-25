import { Icon, IconProps } from "@chakra-ui/react";
import React from "react";

export const YoutubeMusicIcon: React.FC<IconProps> = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="#FF0000"
      d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12s12-5.376 12-12S18.624 0 12 0m0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104s-3.18 7.104-7.104 7.104m0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772M9.684 15.54V8.46L15.816 12z"
    />
  </Icon>
);

export default YoutubeMusicIcon;
