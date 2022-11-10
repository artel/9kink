import { extendTheme, ThemeComponents, ThemeConfig } from "@chakra-ui/react";
import { buttonTheme } from "./components/Button";
import { inputTheme } from "./components/Input";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const components: ThemeComponents = {
  Button: buttonTheme,
  Input: inputTheme,
};

const theme = extendTheme({ config, components });

export default theme;
