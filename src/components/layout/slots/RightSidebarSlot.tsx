import { Box, styled } from "@mui/material";
import { HTMLAttributes } from "react";

interface RightSidebarSlotProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const StyledRightSidebarSlot = styled(Box)`
  width: var(--sidebar-width);
  flex-shrink: 0;
  flex-grow: 0;
`;

export default function RightSidebarSlot({ children }: RightSidebarSlotProps) {
  return <StyledRightSidebarSlot>{children}</StyledRightSidebarSlot>;
}
