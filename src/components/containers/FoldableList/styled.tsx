import { Box, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
const ROW_HEIGHT = "46px";
const LEFT_PADDING = "16px";

export const StyledFoldableList = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .row {
    height: ${ROW_HEIGHT};
    line-height: ${ROW_HEIGHT};
  }

  .title-section {
    padding-left: ${LEFT_PADDING};
    position: relative;

    font-size: 1.26rem;
    z-index: 10;
    font-weight: 700;

    display: flex;
    align-items: center;
    justify-content: space-between;

    // highlight for selected menu
    &.selected::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 2.4px;
      height: 100%;
      background-color: var(--accent-color);
      transform: scaleY(0.75);
    }

    .list-title {
      cursor: pointer;

      flex-grow: 1;

      &:hover {
        text-decoration: underline;
      }
    }

    .toggle-btn {
      flex-shrink: 0;
      flex-grow: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--header-height);
      height: 100%;
      svg {
        width: calc(var(--icon-btn-size) / 2);
        height: calc(var(--icon-btn-size) / 2);
      }
    }
  }

  .menu-items-area {
    overflow: hidden;
    font-size: 0.98rem;
    color: ${grey[700]};
  }

  .menu-item {
    cursor: pointer;

    margin-left: ${LEFT_PADDING};
    margin-right: calc(var(--header-height) / 2);
    padding-left: ${LEFT_PADDING};

    position: relative;
    font-family: "Roboto";
    z-index: 1;

    &:hover {
      background-color: ${grey[100]};
    }
    &.selected {
      font-weight: 700;
    }
  }
`;
