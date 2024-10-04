import { Box, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { toTitleCase } from "@utils/stringUtils";
import cn from "classnames";
import { FOLDABLE_TYPE } from "components/layout/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const ROW_HEIGHT = "46px";
const LEFT_PADDING = "16px";

const StyledFoldableList = styled(Box)`
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
  }
`;

const FoldableList = ({
  data,
  handleNavClose,
  initialIsOpen,
  selectedCategory,
}: {
  data: FOLDABLE_TYPE;
  handleNavClose: () => void;
  initialIsOpen: boolean;
  selectedCategory?: string;
  selectedSubCategory?: string;
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      selectedCategory === data.title ||
      (!selectedCategory && initialIsOpen)
    ) {
      setIsOpen(true);
    } else if (!initialIsOpen) {
      setIsOpen(false);
    }
  }, [data.title, initialIsOpen, selectedCategory]);

  const handleTitleLink = () => {
    // move to link

    navigate(data.link);
    // close navigation
    handleNavClose();
  };

  return (
    <StyledFoldableList>
      <div
        className={cn("title-section row", {
          selected: data.title === selectedCategory,
        })}
      >
        <h3
          className={cn("list-title", "text-hover-effect", {
            selected: data.title === selectedCategory,
          })}
          onClick={handleTitleLink}
        >
          {toTitleCase(data.title)}
        </h3>
        <button
          className="toggle-btn icon-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="menu-items-area"
            initial={{ height: 0, opacity: 0 }} // 시작
            animate={{
              height: "auto",
              opacity: 1,
            }} // 보여질때
            exit={{ height: 0, opacity: 0 }} // 닫혀질때
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {data.items.map((item, idx) => (
              <li
                key={idx}
                onClick={() => {}}
                className="menu-item row text-hover-effect"
              >
                {toTitleCase(item.title)}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </StyledFoldableList>
  );
};

export default FoldableList;
