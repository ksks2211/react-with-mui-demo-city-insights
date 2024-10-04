import { getMenuData } from "components/tmp/data";

export function getItems() {
  const data = getMenuData();
  return data.flatMap((obj) => obj.items);
}

// motion framer
export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // delay for stagger
    },
  },
};

export const boxStyles = {
  height: "100%",
  width: "100%",
  aspectRatio: "540/312",
  position: "relative",
};
export const customGrid2Props = {
  size: { xs: 12, sm: 6 },
  sx: {
    transition: ".8s",
    padding: 1,
  },
};
