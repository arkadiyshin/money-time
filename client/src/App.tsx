import GlobalStyle from "./styles/global";
import { RouteProvider } from "./routes/RouteProvider";
import { baseTheme } from "./styles/theme";
import { ThemeProvider } from "styled-components";

export const App: React.FC = (): any => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme = {baseTheme}>
        <RouteProvider />
      </ThemeProvider>
    </>
  );
};
