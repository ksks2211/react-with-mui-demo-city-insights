import { SxProps, Theme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useScrollY } from "../../hooks";
import SquareIconBtn from "../presentational/SquareIconBtn";

const getSx: (isVisible: boolean) => SxProps<Theme> = (isVisible: boolean) => ({
  position: "fixed",
  zIndex: 10,
  bottom: "30px",
  left: "calc( 100vw - 30px - var(--scrollbar-width))",
  opacity: isVisible ? 1 : 0,
  transition: "bottom .3s, opacity .3s, transform .3s",
  transform: isVisible
    ? "translateY(0) translateX(-100%)"
    : "translateY(100px) translateX(-100%)",
  WebkitTapHighlightColor: "transparent",
  WebkitTouchCallout: "none",
});

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

  const sx = useMemo(() => getSx(isVisible), [isVisible]);

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
      // btnColor={accentColor}
      sx={sx}
      onClick={handleClick}
    />
  );
}
