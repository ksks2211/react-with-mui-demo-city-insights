import { Container, Grid2 } from "@mui/material";
import { toTitleCase } from "@utils/stringUtils";
import cn from "classnames";
import ContainedImage from "components/containers/ContainedImage";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { TargetedEvent } from "shared/types";
import { CustomGrid2, PhotoBox, StyledHeader } from "./styled";
import {
  containerVariants,
  customGrid2Props,
  getItems,
  itemVariants,
} from "./types";

const useContinentSearchParam = () => {
  const [searchParams] = useSearchParams();

  window.scrollTo({ top: 0, behavior: "instant" });

  return searchParams.get("continent") || "all";
};

function validateItem(itemContinent: string, continent: string): boolean {
  return !(itemContinent === continent || continent === "all");
}

export default function MainPage() {
  const continent = useContinentSearchParam();
  const items = getItems();

  const handleHoverStart = ({ currentTarget }: TargetedEvent) => {
    currentTarget.classList.add("underline-visible");
  };

  const handleHoverEnd = ({ currentTarget }: TargetedEvent) => {
    currentTarget.classList.remove("underline-visible");
  };

  function handleImageClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    const imageContainerEl = e.currentTarget;
    const city = imageContainerEl.dataset.city;
    handleHoverStart({ currentTarget: imageContainerEl });

    console.log(city);
  }

  return (
    <Container maxWidth="md">
      <StyledHeader component="h2">
        Continent : {toTitleCase(continent)}
      </StyledHeader>

      <motion.ul
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Grid2 container spacing={0} margin={1}>
          {items.map((item) => (
            <CustomGrid2
              key={item.title}
              {...customGrid2Props}
              className={cn({
                "invisible-item": validateItem(item.continent, continent),
              })}
            >
              <motion.li key={item.title} variants={itemVariants}>
                <PhotoBox
                  className={cn("photo-frame", {
                    "invisible-item": validateItem(item.continent, continent),
                  })}
                  data-city={item.title}
                  onClick={handleImageClick}
                  onTouchStart={handleHoverStart}
                  onMouseOver={handleHoverStart}
                  onMouseOut={handleHoverEnd}
                  onTouchEnd={handleHoverEnd}
                >
                  <ContainedImage
                    src={item.img}
                    alt={item.title}
                    width="100%"
                  />
                  <div className="photo-caption">
                    <h3 className="caption-text">{toTitleCase(item.title)}</h3>
                  </div>
                </PhotoBox>
              </motion.li>
            </CustomGrid2>
          ))}
        </Grid2>
      </motion.ul>
    </Container>
  );
}
