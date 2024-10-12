import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SuspenseLoader from "components/containers/SuspenseLoader.tsx";
import { ModalProvider } from "contexts/ModalContext";
import { TocNavigationProvider } from "contexts/TocNavigationContext";
import { lazy, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { useListenScrollY, useMode } from "./hooks";
import ErrorFallbackPage from "./pages/ErrorFallbackPage";
import createThemeWithMode from "./shared/theme";

const AppRoutes = lazy(() => import("./routes/AppRoutes.tsx"));

const queryClient = new QueryClient();

function App() {
  const { mode } = useMode();
  const theme = useMemo(() => createThemeWithMode(mode), [mode]);

  // scroll related hooks
  useListenScrollY();

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
        <BrowserRouter>
          <ModalProvider>
            <TocNavigationProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <SuspenseLoader>
                  <AppRoutes />
                </SuspenseLoader>
              </ThemeProvider>
            </TocNavigationProvider>
          </ModalProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
