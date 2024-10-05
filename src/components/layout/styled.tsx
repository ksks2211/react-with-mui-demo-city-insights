import { Box, styled } from "@mui/material";

import { common } from "@mui/material/colors";
import { BoxProps } from "@mui/system";
import { rgba } from "polished";
import { largeScreenStyle } from "shared/theme";
import { TRANSITION_DURATION } from "./Layout";

// Footer
export const StyledFooter = styled(Box)<BoxProps>`
  width: 100%;
  min-height: var(--footer-height);

  margin-top: 10rem;
  background-color: var(--footer-background);
  display: flex;
  justify-content: center;
  text-align: center;

  .footer-content-bottom {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.palette.grey[700]};
  }
`;

// Header
export const StyledHeader = styled(Box)`
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
export const StyledMenuButton = styled("button")`
  --left-gap: 8px;

  position: absolute;
  left: var(--left-gap);

  /* Disable tap highlight on the overlay */
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;

  border: none;
  cursor: pointer;

  svg {
    border-radius: 50%;
    display: block;
    width: var(--icon-btn-size);
    height: var(--icon-btn-size);
    padding: var(--icon-btn-padding);
  }

  &:hover::after {
    content: "";
    position: absolute;
    width: 12px;

    /* background-color: green; */
    top: 130%;
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
    top: 130%;
    left: calc(-1 * var(--left-gap) / 2);

    white-space: nowrap;
    font-size: 0.85rem;
    padding: 8px;
    color: ${(props) => props.theme.palette.common.white};
    border-radius: 5px;
    font-weight: 700;

    background-color: ${(props) => props.theme.palette.grey[900]}e0;

    animation: show-up 0.3s forwards;
  }
`;

// Layout
export const StyledLayoutWrapper = styled(Box)`
  --transition-duration: ${TRANSITION_DURATION}ms;
  position: relative;
  height: 100%;

  margin-right: 0;
  transition: 0s;

  .overlay-enter {
    opacity: 0;
  }
  .overlay-enter-active {
    opacity: 1;
    transition: opacity var(--transition-duration);
  }
  .overlay-exit {
    opacity: 1;
    overflow-y: hidden;
  }
  .overlay-exit-active {
    opacity: 0;
    transition: opacity var(--transition-duration);
    overflow-y: hidden;
  }
`;
export const StyledLayout = styled(Box)<{ "data-small-screen": boolean }>`
  ${(props) => props["data-small-screen"] || largeScreenStyle}

  background-color: var(--background-color);
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  min-width: 300px;

  /* overflow: hidden; */
`;
export const ContentSlot = styled(Box)`
  background-color: var(--content-background);
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - var(--footer-height) - var(--header-height));
`;
ContentSlot.displayName = "ContentSlot";

// Navbar

export const StyledNavbar = styled(Box)`
  height: 100%;
  width: var(--sidebar-width);

  background-color: var(--navbar-background);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: scroll;
  &.navbar-open {
    overflow-y: auto;
  }

  .navbar-upper-area {
    position: sticky;
    top: 0;
    height: var(--header-height);

    width: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: end;
    z-index: 20;

    .navbar-close-btn {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      width: var(--header-height);
      cursor: pointer;

      svg {
        border-radius: 50%;
        display: block;
        backdrop-filter: blur(2px);
        background-color: ${rgba(common.black, 0.04)};
        width: var(--icon-btn-size);
        height: var(--icon-btn-size);
        padding: var(--icon-btn-padding);
      }
    }
  }

  .navbar-main-area {
    margin-bottom: calc(var(--header-height) * 2);
  }
`;
