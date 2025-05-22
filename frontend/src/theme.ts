import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
    600: "#2b6cb0",
    500: "#3182ce",
    400: "#4299e1",
    300: "#63b3ed",
    200: "#90cdf4",
    100: "#bee3f8",
    50: "#ebf8ff",
  },
  background: {
    primary: "#FFFFFF",
    secondary: "#F7FAFC",
  },
  text: {
    primary: "#1A202C",
    secondary: "#4A5567",
  }
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors,
});

export default theme;
