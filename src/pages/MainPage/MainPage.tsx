import { Container, Grid2 } from "@mui/material";
import { toTitleCase } from "@utils/stringUtils";
import cn from "classnames";
import ContainedImage from "components/containers/ContainedImage";
import { motion } from "framer-motion";
import { useSelectedRegion } from "hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TargetedEvent } from "shared/types";
import { CustomGrid2, PhotoBox, StyledHeader } from "./styled";
import {
  containerVariants,
  customGrid2Props,
  getItems,
  itemVariants,
} from "./types";

function validateItem(itemContinent: string, continent: string): boolean {
  return itemContinent === continent || continent === "all";
}

const DURATION = 500;

export default function MainPage() {
  const continent = useSelectedRegion() || "all";
  const items = getItems();
  const navigate = useNavigate();

  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined
  );

  const handleHoverStart = ({ currentTarget }: TargetedEvent) => {
    currentTarget.classList.add("underline-visible");
  };

  const handleHoverEnd = ({ currentTarget }: TargetedEvent) => {
    currentTarget.classList.remove("underline-visible");
  };

  const handleImageClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isNavigating) return;
    setIsNavigating(true);

    const imageContainerEl = e.currentTarget;
    const city = imageContainerEl.dataset.city;

    setSelectedCity(city);
    handleHoverStart({ currentTarget: imageContainerEl });

    setTimeout(() => {
      navigate(`/${city}`);
    }, DURATION);
  };

  const filteredItems = items.filter((item) =>
    validateItem(item.continent, continent)
  );

  return (
    <Container maxWidth="md">
      <StyledHeader component="h2">
        Region : {toTitleCase(continent)}
      </StyledHeader>

      <motion.ul
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Grid2 container spacing={0} margin={1}>
          {filteredItems.map((item) => (
            <CustomGrid2 key={item.title} {...customGrid2Props}>
              <motion.li variants={itemVariants}>
                <PhotoBox
                  className={cn("photo-frame", {
                    navigating: isNavigating && selectedCity === item.title,
                  })}
                  data-city={item.title}
                  onClick={handleImageClick}
                  onTouchStart={handleHoverStart}
                  onMouseOver={handleHoverStart}
                  onMouseOut={handleHoverEnd}
                  onTouchEnd={handleHoverEnd}
                  sx={{ transition: `${DURATION / 1000}s` }}
                >
                  <ContainedImage
                    src={item.img}
                    alt={item.title}
                    width="100%"
                  />
                  <div className="photo-caption">
                    <h3 className={cn("caption-text")}>
                      {toTitleCase(item.title)}
                    </h3>
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
