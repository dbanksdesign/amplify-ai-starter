import { createTheme, defaultDarkModeOverride } from "@aws-amplify/ui-react";

export const theme = createTheme({
  name: "my-theme",
  overrides: [defaultDarkModeOverride],
});
