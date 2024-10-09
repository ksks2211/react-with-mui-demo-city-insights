import { TocNavigationContext } from "contexts/TocNavigationContext";
import { useContext } from "react";

const useTocNavigation = () => {
  const tocNavigationContext = useContext(TocNavigationContext);

  if (!tocNavigationContext) {
    throw new Error("Toc Navigation Context is not found!");
  }

  return { tocRef: tocNavigationContext.tocHandlerRef };
};

export default useTocNavigation;
