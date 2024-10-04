import { Box, Container, Grid2, styled } from "@mui/material";
import { BoxProps } from "@mui/system";
import { toTitleCase } from "@utils/stringUtils";
import cn from "classnames";
import ContainedImage from "components/containers/ContainedImage";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  boxStyles,
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

const CustomGrid2 = styled(Grid2)`
  &.invisible-item {
    width: 0;
    opacity: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .photo-frame {
    border-radius: 18px;
    overflow: hidden;
  }
`;

const StyledHeader = styled(Box)<BoxProps>`
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
`;
function validateItem(itemContinent: string, continent: string): boolean {
  return !(itemContinent === continent || continent === "all");
}

export default function MainPage() {
  const continent = useContinentSearchParam();
  const items = getItems();

  function handleImageClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    const imageContainerEl = e.currentTarget;

    const city = imageContainerEl.dataset.city;

    alert(city);
  }

  return (
    <Container maxWidth="md">
      <StyledHeader component="h1">
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
                <Box
                  sx={boxStyles}
                  className="photo-frame"
                  data-city={item.title}
                  onClick={handleImageClick}
                >
                  <ContainedImage
                    src={item.img}
                    alt={item.title}
                    width="100%"
                  />
                </Box>
              </motion.li>
            </CustomGrid2>
          ))}
        </Grid2>
      </motion.ul>
    </Container>
  );
}
