import cn from "classnames";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useScrollY } from "../../hooks";
import SquareIconBtn from "../presentational/SquareIconBtn";

const DISTANCE_FROM_CORNER = "30px";

const iconBtnStyles = {
  position: "fixed",
  zIndex: 10,
  bottom: DISTANCE_FROM_CORNER,
  right: DISTANCE_FROM_CORNER,
  transition: "bottom .3s, opacity .3s, transform .3s",
  WebkitTapHighlightColor: "transparent",
  WebkitTouchCallout: "none",
  opacity: 0,
  transform: "scale(.2)",
  borderRadius: "50%",
  "&.btn-appear": {
    transform: "scale(1)",
    opacity: 1,
  },
};

const LIMIT_HEIGHT = 500;

export default function ScrollTopBtn({
  targetEl,
}: {
  targetEl?: HTMLElement | Window;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScrollY();

  useEffect(() => {
    if (scrollY > LIMIT_HEIGHT) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [scrollY]);

  const handleClick = () => {
    if (targetEl === undefined) {
      targetEl = window;
    }

    targetEl?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <SquareIconBtn
      Icon={FaArrowUp}
      btnColor={(theme) => theme.custom.accentColor}
      className={cn({ "btn-appear": isVisible })}
      sx={iconBtnStyles}
      onClick={handleClick}
    />
  );
}
