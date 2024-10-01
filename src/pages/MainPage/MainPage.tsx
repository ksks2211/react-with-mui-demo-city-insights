import { Box, Container, Grid2, styled } from "@mui/material";
import cn from "classnames";
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

    margin: 0;
    padding: 0;
    opacity: 0;
    overflow: hidden;
  }
`;

export default function MainPage() {
  const continent = useContinentSearchParam();
  const items = getItems();

  return (
    <Container maxWidth="md">
      <h1>{continent}</h1>
      <Grid2 container spacing={0} margin={1}>
        {items.map((item) => (
          <CustomGrid2
            key={item.title}
            size={{ xs: 12, sm: 6 }}
            sx={{
              aspectRatio: "540/312",
              transition: ".6s",
              padding: 1,
            }}
            className={cn({
              "invisible-item": !(
                item.continent === continent || continent === "all"
              ),
            })}
          >
            <Box
              sx={{ backgroundColor: "orange", height: "100%", width: "100%" }}
            >
              {item.title}
            </Box>
            {/* <img src={item.img} alt={item.title} /> */}
          </CustomGrid2>
        ))}
      </Grid2>
    </Container>
  );
}
