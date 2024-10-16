import { toTitleCase } from "@utils/stringUtils";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Region } from "shared/constants";
import type { TargetedEvent } from "shared/types";
import { motionUlProps } from "./constants";
import { StyledFoldableList } from "./styled";

const FoldableList = ({
  data,
  handleNavClose,
  initialIsOpen,
  selectedCategory,
  selectedSubCategory,
}: {
  data: Region;
  handleNavClose: () => void;
  initialIsOpen: boolean;
  selectedCategory?: string;
  selectedSubCategory?: string;
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const navigate = useNavigate();
  const isSelected = data.title === selectedCategory;

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
    navigate(`/${data.link}`);
    // close navigation
    handleNavClose();
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLink = ({ currentTarget }: TargetedEvent) => {
    const sub = currentTarget.dataset.sub as string;
    navigate(`/${sub}`);

    // close navigation
    handleNavClose();
  };

  return (
    <StyledFoldableList>
      <div className={cn("title-section row", { selected: isSelected })}>
        <h3
          className={cn("list-title", "text-hover-effect", {
            selected: isSelected,
          })}
          onClick={handleTitleLink}
        >
          {toTitleCase(data.title)}
        </h3>
        <button className="toggle-btn icon-btn" onClick={handleToggle}>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul className="menu-items-area" {...motionUlProps}>
            {data.items.map((item, idx) => (
              <li
                key={idx}
                onClick={handleLink}
                className={cn("menu-item", "row", "text-hover-effect", {
                  selected: item.title === selectedSubCategory,
                })}
                data-sub={item.title}
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
