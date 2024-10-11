import { Box, CircularProgress } from "@mui/material";

const loaderStyles = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem 0",
};

interface LoadingBoxProps {
  height?: string;
  size?: string;
}

const LoadingBox = ({ height, size }: LoadingBoxProps) => (
  <Box sx={{ ...loaderStyles, height }}>
    <CircularProgress size={size || "2rem"} />
  </Box>
);

export default LoadingBox;
