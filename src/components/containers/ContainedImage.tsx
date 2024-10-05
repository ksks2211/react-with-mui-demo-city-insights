import { Box, Skeleton, styled } from "@mui/material";
import { rgba } from "polished";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const StyledImageWrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;

  .img-alt {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.grey[700]};
  }

  .img-loading {
    background-color: ${({ theme }) => rgba(theme.palette.primary.light, 0.5)};
  }

  .img-error {
    background-color: ${({ theme }) => rgba(theme.palette.warning.light, 0.5)};
  }
`;

const StyledContainedImage = styled("img")`
  position: relative;
  object-fit: cover;
  z-index: 1;
`;

const useInViewOptions = {
  triggerOnce: true,
  threshold: 0.4,
};

export default function ContainedImage({
  src,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { ref, inView } = useInView(useInViewOptions);

  const handleImageLoad = () => {
    setIsSuccess(true);
    setIsLoading(false);
  };

  const handleImageError = () => {
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
        <StyledContainedImage
          src={src}
          width="100%"
          height="100%"
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
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
