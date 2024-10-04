import { Box, Container, Grid2, styled } from "@mui/material";
import { common } from "@mui/material/colors";
import { BoxProps } from "@mui/system";
import { toTitleCase } from "@utils/stringUtils";
import cn from "classnames";
import ContainedImage from "components/containers/ContainedImage";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
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

const CustomGrid2 = styled(Grid2)`
  &.invisible-item {
    width: 0;
    opacity: 0;
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

const PhotoBox = styled(Box)<BoxProps>`
  --underline-thickness: 5px;
  --text-color: ${common.white};

  height: 100%;
  width: 100%;
  aspect-ratio: 540/312;
  position: relative;

  &.invisible-item {
    .photo-caption {
      font-size: 0;
    }
  }

  .photo-caption {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.1);

    transition: 0.5s ease-in-out;
    cursor: pointer;
    font-weight: 900;
    font-size: 2rem;
    z-index: 2;
  }

  .caption-text {
    position: relative;
    color: var(--text-color);

    &::before {
      display: block;
      position: absolute;
      content: "";
      bottom: 0;
      left: 0;

      right: 100%;
      background-color: var(--text-color);
      transition: right 0.4s 0.1s ease-out;

      border-bottom: var(--underline-thickness) solid var(--text-color);
    }
  }

  &.underline-visible {
    &:hover {
      .caption-text::before {
        opacity: 1;
        right: 0;
      }
    }
  }
`;

export default function MainPage() {
  const continent = useContinentSearchParam();
  const items = getItems();

  function handleImageClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    const imageContainerEl = e.currentTarget;

    const city = imageContainerEl.dataset.city;

    console.log(city);
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
                <PhotoBox
                  className={cn("photo-frame", {
                    "invisible-item": validateItem(item.continent, continent),
                  })}
                  data-city={item.title}
                  onClick={handleImageClick}
                  onTouchStart={(e) => {
                    e.currentTarget.classList.add("underline-visible");
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.classList.add("underline-visible");
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.classList.remove("underline-visible");
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.classList.remove("underline-visible");
                  }}
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
