import { Box, Skeleton } from "@mui/material";
import { useInView } from "react-intersection-observer";

type LazyMountWrapperProps = {
  children: React.ReactNode | ((hasMounted: boolean) => React.ReactNode);
  width?: string;
  height?: string;
  threshold?: number;
};

const getSx = (width?: string, height?: string) => ({
  width: width || "100%",
  height: height || "100%",
  minHeight: height || "50px",
});

export default function LazyMountEnhancer({
  children,
  width,
  height,
  threshold,
}: LazyMountWrapperProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: threshold || 0.3,
  });

  const sx = getSx(width, height);

  if (typeof children === "function") {
    return (
      <Box sx={sx} ref={ref}>
        {children(inView)}
      </Box>
    );
  }

  return (
    <Box ref={ref} sx={sx}>
      {inView ? children : <Skeleton sx={{ width: "100%", height: "100%" }} />}
    </Box>
  );
}
