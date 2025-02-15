import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming";

addons.setConfig({
  theme: themes.dark, // Default to dark mode
  showPanel: true, // Show controls panel
  panelPosition: "right", // Move controls to the right
});
