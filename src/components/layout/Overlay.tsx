import { Box, BoxProps, styled } from "@mui/material";

interface OverlayProps extends BoxProps {
  overlayRef?: React.RefObject<HTMLDivElement>;
}

const StyledOverlay = styled(Box)`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 15;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.5);

  cursor: pointer;

  /* Disable tap highlight on the overlay */
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
`;

export default function Overlay({
  children,
  overlayRef,
  onClick,
  ...rest
}: OverlayProps) {
  return (
    <StyledOverlay ref={overlayRef} onClick={onClick} {...rest}>
      {children}
    </StyledOverlay>
  );
}
