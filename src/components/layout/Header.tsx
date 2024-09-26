import { Box, styled, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { HTMLAttributes } from "react";
import { LuMenu } from "react-icons/lu";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  handleToggle: () => void;
  isNavOpen: boolean;
  isLargeScreen: boolean;
}

const StyledHeader = styled(Box)`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  position: relative;

  height: var(--header-height);
  width: 100%;
  background-color: var(--header-background);
  backdrop-filter: blur(1.6px);
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
`;

const StyledMenuButton = styled("button")<{ "data-nav-open": boolean }>`
  --left-gap: 10px;

  position: absolute;
  left: var(--left-gap);
  width: var(--icon-btn-size);
  height: var(--icon-btn-size);
  padding: var(--icon-btn-padding);

  cursor: pointer;
  /* Disable tap highlight on the overlay */
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;

  border: none;
  background-color: transparent;

  svg {
    width: 100%;
    height: 100%;
    color: var(--icon-color);
    fill: var(--icon-color);
  }

  &:hover::after {
    content: "";
    position: absolute;
    width: 12px;

    /* background-color: green; */
    top: 100%;
    left: 50%;

    /* border-top: 10px solid black; */
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid ${(props) => props.theme.palette.grey[900]}e0;
    transform: translate(-50%, -100%);
    animation: show-up 0.3s forwards;
  }

  &:hover::before {
    content: "Open Sidebar";
    position: absolute;
    white-space: nowrap;
    font-size: 0.85rem;
    padding: 8px;
    color: ${(props) => props.theme.palette.common.white};
    border-radius: 5px;
    font-weight: 700;
    top: 100%;
    left: calc(-1 * var(--left-gap) / 2);
    background-color: ${(props) => props.theme.palette.grey[900]}e0;

    animation: show-up 0.3s forwards;
  }
`;

export default function Header({
  handleToggle,
  isNavOpen,
  isLargeScreen,
}: HeaderProps) {
  const headerTitle = "City Insights";

  return (
    <StyledHeader>
      <Typography
        variant="h2"
        fontFamily={["Fredoka"]}
        fontSize="1.6rem"
        fontWeight="700"
        color={orange[900]}
      >
        {headerTitle}
      </Typography>

      <StyledMenuButton
        onClick={handleToggle}
        className="menu-btn"
        data-nav-open={isNavOpen}
        data-large-screen={isLargeScreen}
      >
        <LuMenu />
      </StyledMenuButton>
    </StyledHeader>
  );
}
