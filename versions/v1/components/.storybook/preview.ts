import "../src/global.css";

import { colors } from "@mat-design/tokens";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
  layout: 'centered',
    backgrounds: {
    default: "light",
    values: [
      { name: "light", value: "#ffffff" },
      { name: "dark", value: "#1e1e1e" },
      { name: "primary", value: colors["color-primary-primary-500"] },
    ],
  },
};
