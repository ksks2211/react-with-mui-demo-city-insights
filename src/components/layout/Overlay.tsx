import { Box, styled } from "@mui/material";
import { common } from "@mui/material/colors";
import type { BoxProps } from "@mui/system";
import { rgba } from "polished";

interface OverlayProps extends BoxProps {
  overlayRef?: React.RefObject<HTMLDivElement>;
}

const StyledOverlay = styled(Box)`
  position: fixed;
  inset: 0;

  z-index: 15;
  overflow-y: scroll;
  background-color: ${rgba(common.black, 0.5)};
  /* backdrop-filter: blur(2px); */

  /* cursor: pointer; */

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
