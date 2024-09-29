import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "contexts/ModalContext";
import { useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { useListenScrollY, useMode } from "./hooks";
import ErrorFallbackPage from "./pages/ErrorFallbackPage";
import AppRoutes from "./routes/AppRoutes";
import createThemeWithMode from "./shared/theme";

const queryClient = new QueryClient();

function App() {
  const { mode } = useMode();
  const theme = useMemo(() => createThemeWithMode(mode), [mode]);

  // scroll related hooks
  useListenScrollY();

  return (
    <ModalProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppRoutes />
            </ThemeProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </QueryClientProvider>
    </ModalProvider>
  );
}

export default App;
