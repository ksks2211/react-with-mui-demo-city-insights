import { TocNavigationContext } from "contexts/TocNavigationContext";
import { useContext } from "react";

const useTocNavigation = () => {
  const tocNavigationContext = useContext(TocNavigationContext);

  if (!tocNavigationContext) {
    throw new Error("Toc Navigation Context is not found!");
  }

  const { tocHandlerRef, focusedSection, setFocusedSection } =
    tocNavigationContext;

  return { tocRef: tocHandlerRef, focusedSection, setFocusedSection };
};

export default useTocNavigation;
