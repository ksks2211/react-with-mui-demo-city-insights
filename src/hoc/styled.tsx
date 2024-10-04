import { Box, styled } from "@mui/material";
import { rgba } from "polished";

export const StyledLazyWrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;

  .loading {
    border-radius: 1rem;
    background-color: ${({ theme }) => rgba(theme.palette.primary.light, 0.5)};
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.grey[700]};
  }
`;
