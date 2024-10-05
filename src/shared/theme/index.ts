import { createTheme, css, PaletteMode } from "@mui/material";
import { common, orange } from "@mui/material/colors";
import { darken, rgba } from "polished";

export type PaletteKey =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"; // or use keyof typeof theme.palette

const ACCENT_COLOR = "#2980b9" as const;

const commonStyles = css`
  :root {
    --header-height: 52px;
    --icon-btn-size: 35px;
    --icon-btn-padding: 6.5px;
    --footer-height: 165px;
    --sidebar-width: 260px;
    --header-background: #f5f5f580;
    --footer-background: ${darken(0.1, ACCENT_COLOR)}50;
    --content-background: #f5f5dc10;
    --navbar-background: #ffffff;
    --main-background: transparent;

    // colors
    --primary-color: ${orange[700]};
    --theme-bg-color: #f5f5dc;
    --accent-color: ${ACCENT_COLOR};
  }

  .text-hover-effect {
    &:hover {
      color: ${darken(0.02, orange[900])};
    }
  }

  .icon-btn {
    svg {
      color: ${rgba(common.black, 0.7)};
      fill: ${rgba(common.black, 0.7)};
    }

    &:hover {
      svg {
        color: ${darken(0.02, orange[900])};
        fill: ${darken(0.02, orange[900])};
      }
    }
  }

  @keyframes fade-in {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

  @keyframes show-up {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      background-color: rgba(0, 0, 0, 0.4);
    }
    to {
      background-color: rgba(0, 0, 0, 0);
    }
  }

  @keyframes ripple-effect {
    to {
      transform: scale(2.8);
      opacity: 0;
    }
  }
`;

// Mode specific styles
const globalStylesLight = css`
  ${commonStyles}
  :root {
    --footer-color: #837c7c; // Example color for light mode
    --background-color: ${common.white};
    --text-color: #333333;
  }
`;

const globalStylesDark = css`
  ${commonStyles}

  :root {
    --footer-color: #505050; // Example color for dark mode
    --background-color: ${common.black};
    --text-color: #dddddd;
  }
`;

// Desktop styles
export const largeScreenStyle = css`
  --header-height: 62px;
`;

export default function createThemeWithMode(mode: PaletteMode = "light") {
  return createTheme({
    typography: {
      fontFamily: ["Roboto", "Fredoka"].join(","),
    },
    custom: { accentColor: ACCENT_COLOR },
    palette: { mode },
    components: {
      MuiCssBaseline: {
        styleOverrides:
          mode === "light" ? globalStylesLight.styles : globalStylesDark.styles,
      },
    },
  });
}
