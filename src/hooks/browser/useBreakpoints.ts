import { useMediaQuery, useTheme } from "@mui/material";

export default function useBreakpoints() {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.up("xs"));
  const isMd = useMediaQuery(theme.breakpoints.up("sm"));
  const isLg = useMediaQuery(theme.breakpoints.up("md"));
  const isXl = useMediaQuery(theme.breakpoints.up("lg"));
  const isXXl = useMediaQuery(theme.breakpoints.up("xl"));

  const isSmRange = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const isMdRange = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLgRange = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  return {
    isDownMd,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isXXl,

    isXsRange: isXs,
    isSmRange,
    isMdRange,
    isLgRange,
    isXlRange: isXl,
  };
}
