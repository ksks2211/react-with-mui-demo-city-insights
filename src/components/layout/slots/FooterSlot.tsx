import { Box, styled } from "@mui/material";
import React from "react";

interface FooterSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const StyledFooterSlot = styled(Box)`
  width: 100%;
  background-color: var(--footer-background);
  min-height: var(--footer-height);
`;

export default function FooterSlot({ children }: FooterSlotProps) {
  return <StyledFooterSlot>{children}</StyledFooterSlot>;
}
