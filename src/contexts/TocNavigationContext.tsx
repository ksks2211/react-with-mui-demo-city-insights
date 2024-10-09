import { createContext, useRef } from "react";

type TocNavigationState = {
  tocHandlerRef: React.MutableRefObject<((key: string) => void) | null>;
};

const TocNavigationContext = createContext<TocNavigationState | undefined>(
  undefined
);

interface TocNavigationProps {
  children?: React.ReactNode;
}

const TocNavigationProvider: React.FC<TocNavigationProps> = ({ children }) => {
  const tocHandlerRef = useRef<() => void>(null);

  return (
    <TocNavigationContext.Provider value={{ tocHandlerRef }}>
      {children}
    </TocNavigationContext.Provider>
  );
};

export { TocNavigationContext, TocNavigationProvider };
