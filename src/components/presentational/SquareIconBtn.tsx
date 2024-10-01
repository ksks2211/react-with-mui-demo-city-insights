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

  cursor: pointer;
  background-color: var(--background-color);
  &:hover {
    background-color: var(--background-color-hover);
  }
  svg {
    border-radius: 50%;
    display: block;
    width: var(--icon-btn-size);
    height: var(--icon-btn-size);
    padding: var(--icon-btn-padding);
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
