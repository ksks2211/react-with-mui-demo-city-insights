import { Box, styled } from "@mui/material";
import { BoxProps } from "@mui/system";
import { extractNumber } from "@utils/numberUtils";
import LazyMountEnhancer from "components/enhancers/LazyMountEnhancer";
import { useCssVariableColor } from "hooks";
import { darken } from "polished";
import React, { useImperativeHandle, useRef } from "react";

const MIN_HEIGHT = "300px" as const;

export interface SectionDividerHandle {
  moveTo: () => void;
  readTop: () => number;
}
interface SectionDividerProps extends BoxProps {
  title: string;
  size?: "lg" | "md";
}

const StyledSection = styled(Box)`
  --section-background: #f6f7fb;

  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1.3rem;

  // tmp
  height: 400px;

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
    border-radius: 12px;

    background-color: var(--section-background);
  }
`;

const getStyles = (size: string, accentColor: string) => {
  const isLarge = size === "lg";

  return {
    ".section-title": {
      fontSize: isLarge ? "1.65rem" : "1.25rem",
      fontWeight: isLarge ? 900 : 500,
      color: isLarge ? darken(0.05, accentColor) : undefined,
      span: {
        borderBottomWidth: isLarge ? 0 : "1px",
        fontFamily: isLarge ? "Roboto" : undefined,
      },
    },
  };
};

const SectionDivider = React.forwardRef<
  SectionDividerHandle,
  SectionDividerProps
>(({ title, children, size = "md" }, ref) => {
  const moveToRef = useRef<HTMLSpanElement>(null);

  const accentColor = useCssVariableColor("--accent-color");
  const headerHeight = useCssVariableColor("--header-height");

  const sx = getStyles(size, accentColor);

  useImperativeHandle(ref, () => ({
    moveTo: () => {
      if (moveToRef.current) {
        // 요소의 절대 위치를 계산하여 스크롤
        const { top } = moveToRef.current.getBoundingClientRect();
        const absoluteTop = window.scrollY + top - extractNumber(headerHeight);
        window.scrollTo({ top: absoluteTop, behavior: "smooth" });
      }
    },
    readTop: () => {
      if (moveToRef.current) {
        // 요소의 절대 위치를 계산하여 스크롤
        const { top } = moveToRef.current.getBoundingClientRect();
        return top;
      }
      return 0;
    },
  }));

  return (
    <>
      <span ref={moveToRef} />
      <LazyMountEnhancer height={MIN_HEIGHT} threshold={0.5} key={title}>
        <StyledSection sx={sx}>
          <h2 className="section-title">
            <span>{title}</span>
          </h2>

          <div className="section-content">{children}</div>
        </StyledSection>
      </LazyMountEnhancer>
    </>
  );
});

export default SectionDivider;
