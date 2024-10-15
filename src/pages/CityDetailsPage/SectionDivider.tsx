import { extractNumber } from "@utils/numberUtils";
import LazyMountEnhancer from "components/enhancers/LazyMountEnhancer";
import { useCssVariableColor } from "hooks";
import { darken } from "polished";
import React, { useImperativeHandle, useRef } from "react";
import { StyledSection } from "./styled";
import { SectionDividerHandle, SectionDividerProps } from "./types";

const MIN_HEIGHT = "300px" as const;

const getSectionStyles = (size: string, accentColor: string) => {
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

  const sx = getSectionStyles(size, accentColor);

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
    getTitle: () => {
      return title;
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
