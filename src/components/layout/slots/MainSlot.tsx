import { Box, styled } from "@mui/material";
import cn from "classnames";
interface MainSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  isLargeScreen: boolean;
}

const StyledMainSlot = styled(Box)`
  background-color: var(--main-background);
  flex-grow: 1;
  height: 100%;
  margin-left: 0;

  &.large-screen {
    margin-left: var(--sidebar-width);
  }
`;

export default function Main({ isLargeScreen, children }: MainSlotProps) {
  return (
    <StyledMainSlot className={cn({ "large-screen": isLargeScreen })}>
      {children}
    </StyledMainSlot>
  );
}
