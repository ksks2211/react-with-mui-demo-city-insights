import { Box, BoxProps, styled, Theme, useTheme } from "@mui/material";
import { darken } from "polished";
import type { IconType } from "react-icons";

type Color = ((theme: Theme) => string) | string;

interface SquareIconBtnProps extends BoxProps {
  Icon: IconType;
  btnColor: Color;
}

const StyledSquareIconBtn = styled(Box)<{ "data-btn-color": string }>`
  --common-white: ${({ theme }) => theme.palette.common.white};
  --background-color: ${({ "data-btn-color": btnColor }) => btnColor};
  --background-color-hover: ${({ "data-btn-color": btnColor }) =>
    darken(0.15, btnColor)};

  width: 42px;
  aspect-ratio: 1 / 1;
  padding: 8px;

  cursor: pointer;

  border: 2px solid var(--common-white);
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--background-color);

  &:hover {
    background-color: var(--background-color-hover);
  }
  svg {
    width: 100%;
    height: 100%;
    fill: var(--common-white);
  }
`;

export default function SquareIconBtn({
  Icon,
  btnColor,
  sx,
  onClick,
  ...rest
}: SquareIconBtnProps) {
  const theme = useTheme();
  const colorStr = typeof btnColor === "function" ? btnColor(theme) : btnColor;

  return (
    <StyledSquareIconBtn
      data-btn-color={colorStr}
      sx={sx}
      onClick={onClick}
      {...rest}
    >
      <Icon />
    </StyledSquareIconBtn>
  );
}
