import { Box } from "@mui/material";
import LoadingBox from "components/presentational/LoadingBox";
import { useInView } from "react-intersection-observer";

type LazyMountWrapperProps = {
  children?: React.ReactNode | ((hasMounted: boolean) => React.ReactNode);
  width?: string;
  height?: string;
  threshold?: number;
};

const getSx = (inView: boolean, width?: string, height?: string) => ({
  width: width || "100%",
  height: !inView ? height || "100%" : "100%",
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

  const sx = getSx(inView, width, height);

  if (typeof children === "function") {
    return (
      <Box sx={sx} ref={ref}>
        {children(inView)}
      </Box>
    );
  }

  return (
    <Box ref={ref} sx={sx}>
      {inView ? children : <LoadingBox size="3rem" height={height} />}
    </Box>
  );
}
