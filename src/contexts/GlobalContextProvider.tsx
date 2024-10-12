import React from "react";
import { ModalProvider } from "./ModalContext";
import { TocNavigationProvider } from "./TocNavigationContext";

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <TocNavigationProvider>{children}</TocNavigationProvider>
    </ModalProvider>
  );
}
