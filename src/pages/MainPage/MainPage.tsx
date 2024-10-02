import { Box, Container, Grid2, styled } from "@mui/material";
import { toTitleCase } from "@utils/stringUtils";
import cn from "classnames";
import ContainedImage from "components/containers/ContainedImage";
import { getMenuData } from "components/tmp/data";
import { useSearchParams } from "react-router-dom";
function getItems() {
  const data = getMenuData();

  return data.flatMap((obj) => obj.items);
}

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

export default function MainPage() {
  const continent = useContinentSearchParam();
  const items = getItems();

  return (
    <Container maxWidth="md">
      <h1>{toTitleCase(continent)}</h1>
      <Grid2 container spacing={0} margin={1}>
        {items.map((item) => (
          <CustomGrid2
            key={item.title}
            size={{ xs: 12, sm: 6 }}
            sx={{
              transition: " .7s ",
              padding: 1,
            }}
            className={cn({
              "invisible-item": !(
                item.continent === continent || continent === "all"
              ),
            })}
          >
            <Box
              sx={{ height: "100%", width: "100%", aspectRatio: "540/312" }}
              className="photo-frame"
            >
              <ContainedImage src={item.img} alt={item.title} width="100%" />
            </Box>
          </CustomGrid2>
        ))}
      </Grid2>
    </Container>
  );
}
