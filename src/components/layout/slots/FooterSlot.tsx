import { Box, BoxProps, styled } from "@mui/material";

const StyledFooterSlot = styled(Box)`
  width: 100%;
  flex-shrink: 0;
`;

export default function FooterSlot({ children }: BoxProps) {
  return <StyledFooterSlot>{children}</StyledFooterSlot>;
}
