import { Box, styled, SxProps, Theme, useTheme } from "@mui/material";
import { darken } from "polished";
import { HTMLAttributes } from "react";
import type { IconType } from "react-icons";

type Color = ((theme: Theme) => string) | string;

interface SquareIconBtnProps extends HTMLAttributes<HTMLDivElement> {
  Icon: IconType;
  btnColor: Color;
  sx?: SxProps<Theme>;
}

const StyledSquareIconBtn = styled(Box)<{ "data-btn-color": string }>`
  --common-white: ${(props) => props.theme.palette.common.white};
  --background-color: ${(props) => props["data-btn-color"]};
  --background-color-hover: ${(props) => darken(0.15, props["data-btn-color"])};

  width: 42px;
  height: 42px;

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

  //  transition: 0.2s;

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
}: SquareIconBtnProps) {
  const theme = useTheme();
  const colorStr = typeof btnColor === "function" ? btnColor(theme) : btnColor;

  return (
    <StyledSquareIconBtn data-btn-color={colorStr} sx={sx} onClick={onClick}>
      <Icon />
    </StyledSquareIconBtn>
  );
}
