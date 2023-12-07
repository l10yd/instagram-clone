import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { ChakraProvider, SystemStyleObject } from "@chakra-ui/react";

import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

interface GlobalStylesProps {
  global: (props: Record<string, any>) => SystemStyleObject;
}

const styles: GlobalStylesProps = {
  global: (props) => ({
    body: {
      bg: mode("gray.100", "#000")(props),
      color: mode("gray.800", "whiteAlpha.900")(props),
    },
  }),
};

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ config, styles });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);
