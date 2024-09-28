import { Box, BoxProps, styled } from "@mui/material";

const StyledRightSidebarSlot = styled(Box)`
  width: var(--sidebar-width);
  flex-shrink: 0;
  flex-grow: 0;
`;

export default function RightSidebarSlot({ children }: BoxProps) {
  return <StyledRightSidebarSlot>{children}</StyledRightSidebarSlot>;
}
