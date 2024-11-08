import { extractNumber } from "@utils/numberUtils";
import LazyMountEnhancer from "components/enhancers/LazyMountEnhancer";
import { useCssVariableColor, useTocNavigation } from "hooks";
import React, { useEffect, useImperativeHandle, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { getSectionStyles, MIN_HEIGHT } from "./constants";
import { StyledSection } from "./styled";
import type { SectionDividerHandle, SectionDividerProps } from "./types";

const SectionDivider = React.forwardRef<
  SectionDividerHandle,
  SectionDividerProps
>(({ title, children, size = "md" }, ref) => {
  const moveToRef = useRef<HTMLDivElement>(null);
  const { setFocusedSection } = useTocNavigation();

  const accentColor = useCssVariableColor("--accent-color");
  const headerHeight = useCssVariableColor("--header-height");

  const sx = getSectionStyles(size, accentColor);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
    rootMargin: `-0px 0px -40% 0px`,
  });

  useEffect(() => {
    if (inView) {
      setFocusedSection(title);
    }
  }, [inView, setFocusedSection, title]);

  useImperativeHandle(ref, () => ({
    moveTo: () => {
      if (moveToRef.current) {
        // 요소의 절대 위치를 계산하여 스크롤
        const { top } = moveToRef.current.getBoundingClientRect();
        const absoluteTop = window.scrollY + top - extractNumber(headerHeight);
        window.scrollTo({ top: absoluteTop, behavior: "smooth" });
      }
    },

    getTitle: () => {
      return title;
    },
  }));

  return (
    <div ref={moveToRef}>
      <LazyMountEnhancer height={MIN_HEIGHT} threshold={0.5} key={title}>
        <StyledSection sx={sx} ref={inViewRef}>
          <h2 className="section-title">
            <span>{title}</span>
          </h2>
          <div className="section-content">{children}</div>
        </StyledSection>
      </LazyMountEnhancer>
    </div>
  );
});

export default SectionDivider;
