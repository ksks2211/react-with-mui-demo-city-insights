import { Box, BoxProps, styled } from "@mui/material";
import { common } from "@mui/material/colors";
import { darken, rgba } from "polished";
import { useCallback } from "react";

interface RippleBoxProps extends BoxProps {
  backgroundColor?: string;
}

const StyledRippleBox = styled(Box)<{ "data-bg-color": string }>`
  position: relative;
  overflow: hidden;

  background-color: ${(props) => props["data-bg-color"]};

  .ripple {
    position: absolute;
    position: absolute;
    border-radius: 50%;

    pointer-events: none;
    transform: scale(0);
    animation: ripple-effect 0.5s ease-in;

    background: ${rgba(common.white, 0.25)};
    box-shadow: 0 0 150px 10px ${(props) => darken(0.1, props["data-bg-color"])};
  }
`;

export default function RippleBox({
  backgroundColor = common.white,
  onClick,
  ...rest
}: RippleBoxProps) {
  const rippleHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const container = event.currentTarget;

      const circle = document.createElement("span");
      circle.classList.add("ripple");

      const rect = container.getBoundingClientRect();
      const length = Math.max(rect.width, rect.height);

      circle.style.width = `${length}px`;
      circle.style.height = `${length}px`;
      circle.style.left = `${event.clientX - rect.left - length / 2}px`;
      circle.style.top = `${event.clientY - rect.top - length / 2}px`;

      container.appendChild(circle);
      circle.addEventListener("animationend", () => {
        circle.remove();
      });

      if (onClick) {
        onClick(event);
      }
    },
    [onClick]
  );

  return (
    <StyledRippleBox
      {...rest}
      onClick={rippleHandler}
      data-bg-color={backgroundColor}
    />
  );
}
