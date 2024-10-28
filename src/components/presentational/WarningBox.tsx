import { Box, Theme, useTheme } from "@mui/material";

interface WarningBoxProps {
  message?: string;
  error?: unknown | Error;
  reset: () => unknown;
}

const boxStyles = (theme: Theme) => ({
  backgroundColor: theme.palette.warning.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function WarningBox({ message }: WarningBoxProps) {
  const theme = useTheme();

  return <Box sx={boxStyles(theme)}>{message}</Box>;
}
