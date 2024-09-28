import { Box, BoxProps, styled } from "@mui/material";

const StyledFooterSlot = styled(Box)`
  width: 100%;
  background-color: var(--footer-background);
  min-height: var(--footer-height);
`;

export default function FooterSlot({ children }: BoxProps) {
  return <StyledFooterSlot>{children}</StyledFooterSlot>;
}
