import * as React from "react";
import { ColorMode, View } from "@aws-amplify/ui-react";
import { theme } from "../theme";
import { ThemeStyle } from "@aws-amplify/ui-react/server";

interface ThemeProviderValue {
  colorMode: ColorMode;
  setColorMode: React.Dispatch<React.SetStateAction<ColorMode>>;
}

export const ThemeContext = React.createContext<ThemeProviderValue>({
  colorMode: "light",
  setColorMode: () => {},
});

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [colorMode, setColorMode] = React.useState<ColorMode>("light");

  const handleColorModeChange = (event: MediaQueryListEvent) => {
    const newColorScheme = event.matches ? "dark" : "light";
    setColorMode(newColorScheme);
  };

  React.useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setColorMode("dark");
    }
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleColorModeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleColorModeChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      <View
        {...theme.containerProps({ colorMode })}
        backgroundColor="background.primary"
        color="text.primary"
        height="100vh"
        width="100vw"
      >
        {children}
        <ThemeStyle theme={theme} />
      </View>
    </ThemeContext.Provider>
  );
};
