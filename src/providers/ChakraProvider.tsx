import type { FC, PropsWithChildren } from "react";
import {
  ChakraProvider as __ChakraProvider,
  theme,
  extendTheme,
} from "@chakra-ui/react";
import { Global } from "@emotion/react";

const extendedTheme = extendTheme(
  {
    initialColorMode: "light",
    useSystemColorMode: false,
    colors: {
      ...theme.colors,
      brand: {
        "50": "#e3eff0",
        "100": "#cce7e9",
        "200": "#b2dee2",
        "300": "#99d5db",
        "400": "#80ccd4",
        "500": "#68c3cd",
        "600": "#5db8c4",
        "700": "#51adb9",
        "800": "#46a2b0",
        "900": "#379297",
      },
    },
    fonts: {
      heading: "Lexend, sans-serif",
      body: "Inter, sans-serif",
    },
  },
  theme
);

export const ChakraProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <__ChakraProvider {...{ theme: extendedTheme }}>
      <>
        <Global
          styles={{
            body: {
              textRendering: "optimizeLegibility",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              scrollBehavior: "smooth",
            },
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        />
        {children}
      </>
    </__ChakraProvider>
  );
};
