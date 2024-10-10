import { createContext, useRef, useState } from "react";

type TocNavigationState = {
  tocHandlerRef: React.MutableRefObject<((key: string) => void) | null>;
  focusedSection: string | null;
  setFocusedSection: (v: string | null) => void;
};

const TocNavigationContext = createContext<TocNavigationState | undefined>(
  undefined
);

interface TocNavigationProps {
  children?: React.ReactNode;
}

const TocNavigationProvider: React.FC<TocNavigationProps> = ({ children }) => {
  const tocHandlerRef = useRef<() => void>(null);
  const [focusedSection, setFocusedSection] = useState<string | null>(null);

  return (
    <TocNavigationContext.Provider
      value={{ tocHandlerRef, focusedSection, setFocusedSection }}
    >
      {children}
    </TocNavigationContext.Provider>
  );
};

export { TocNavigationContext, TocNavigationProvider };
