import { Container, Grid2 } from "@mui/material";
import { toTitleCase } from "@utils/stringUtils";
import cn from "classnames";
import ContainedImage from "components/containers/ContainedImage";
import QueryGuard from "components/guards/QueryGuard";
import { motion } from "framer-motion";
import { useSelectedRegion } from "hooks";
import { useGetMenu } from "hooks/queries/useMenu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, TargetedEvent } from "shared/types";
import { CustomGrid2, PhotoBox, StyledHeader } from "./styled";
import { containerVariants, customGrid2Props, itemVariants } from "./types";

function validateItem(itemRegion: string, region: string): boolean {
  return itemRegion === region || region === "all";
}

const DURATION = 500;

const photoBoxStyles = { transition: `${DURATION / 1000}s` };

export function MainPage({ data }: { data: Menu }) {
  const region = useSelectedRegion() || "all";
  const items = data.flatMap((obj) => obj.items);
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
    validateItem(item.continent, region)
  );

  return (
    <Container maxWidth="md" sx={{ paddingBottom: "7rem" }}>
      <StyledHeader component="h2">Region : {toTitleCase(region)}</StyledHeader>

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
                  sx={photoBoxStyles}
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

export default function MainPageWithGuard() {
  const query = useGetMenu();
  return <QueryGuard query={query} Component={MainPage} />;
}
