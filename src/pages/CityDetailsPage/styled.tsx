import { Box, styled } from "@mui/material";

export const StyledSection = styled(Box)`
  --section-background: #f6f7fb;

  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1.3rem;

  // tmp
  min-height: 300px;

  .section-title {
    padding: 1.8rem 0.4rem 1rem;
    span {
      display: block;
      height: 110%;

      font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      border-bottom-color: ${({ theme }) => theme.palette.grey[400]};
      border-bottom-style: solid;
    }
  }

  .section-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 12px;
    background-color: var(--section-bg);
  }
`;
