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

export const customGrid2Props = {
  size: { xs: 12, sm: 6 },
  sx: {
    transition: ".8s",
    padding: 1,
  },
};
