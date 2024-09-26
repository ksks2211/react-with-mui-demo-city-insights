// theme.d.ts
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      accentColor: string;
    };
  }

  interface ThemeOptions {
    custom?: {
      accentColor?: string;
    };
  }
}
