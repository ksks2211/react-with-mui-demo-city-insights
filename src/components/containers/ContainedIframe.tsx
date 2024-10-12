import { Box, Skeleton, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { StyledImageWrapper } from "./ContainedImage";

const StyledContainedIframe = styled("iframe")`
  position: relative;
  z-index: 1;
`;

const useInViewOptions = {
  triggerOnce: true,
  threshold: 0.4,
};

export default function ContainedIframe({
  src,
  ...rest
}: React.IframeHTMLAttributes<HTMLIFrameElement>) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { ref, inView } = useInView(useInViewOptions);

  const handleIframeLoad = () => {
    setIsSuccess(true);
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsError(true);
    setIsLoading(false);
    setIsSuccess(false);
  };

  // when the component is in view start loading
  useEffect(() => {
    const handleImageLoadStart = () => {
      if (isSuccess) return;
      setIsLoading(true);
    };

    if (inView) {
      handleImageLoadStart();
    }
  }, [inView, isSuccess]);

  return (
    <StyledImageWrapper ref={ref}>
      {(isLoading || isSuccess) && (
        <StyledContainedIframe
          src={src}
          width="100%"
          height="100%"
          loading="lazy"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          {...rest}
        />
      )}

      {isLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          className="img-alt img-loading"
        />
      )}
      {isError && (
        <Box width="100%" height="100%" className="img-alt img-error">
          Not Found...
        </Box>
      )}
    </StyledImageWrapper>
  );
}
