import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { StyledLazyWrapper } from "./styled";

function withLazyMount<P extends object>(Component: React.ComponentType<P>) {
  return (props: P) => {
    const [hasMounted, setHasMounted] = useState(false);
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.3,
    });

    useEffect(() => {
      if (inView) {
        setHasMounted(true);
      }
    }, [inView]);

    return (
      <StyledLazyWrapper ref={ref}>
        {hasMounted ? (
          <Component {...props} />
        ) : (
          <div className="loading">
            <CircularProgress color="inherit" />
          </div>
        )}
      </StyledLazyWrapper>
    );
  };
}

export default withLazyMount;
