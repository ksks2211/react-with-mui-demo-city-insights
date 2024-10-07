import { Box, Grid2, styled } from "@mui/material";
import { BoxProps } from "@mui/system";

import { common } from "@mui/material/colors";

export const CustomGrid2 = styled(Grid2)`
  .photo-frame {
    border-radius: 18px;
    overflow: hidden;
  }
`;

export const PhotoBox = styled(Box)<BoxProps>`
  --underline-thickness: 5px;
  --text-color: ${common.white};

  height: 100%;
  width: 100%;
  aspect-ratio: 540/312;
  position: relative;

  .photo-caption {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.1);

    transition: 0.5s ease-in-out;
    cursor: pointer;
    font-weight: 900;
    font-size: 2rem;
    z-index: 2;
  }

  .caption-text {
    position: relative;
    color: var(--text-color);

    &::before {
      display: block;
      position: absolute;
      content: "";
      bottom: 0;
      left: 0;

      right: 100%;
      background-color: var(--text-color);
      transition: right 0.4s 0.1s ease-out;

      border-bottom: var(--underline-thickness) solid var(--text-color);
    }
  }

  // Highlight text
  &.underline-visible {
    &:hover {
      .caption-text::before {
        opacity: 1;
        right: 0;
      }
    }
  }
`;

export const StyledHeader = styled(Box)<BoxProps>`
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
`;
