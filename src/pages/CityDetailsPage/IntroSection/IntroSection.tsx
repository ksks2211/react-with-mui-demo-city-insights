import { Box, styled } from "@mui/material";
import GoogleMapEmbed from "components/containers/GoogleMapEmbed";
import QueryGuard from "components/guards/QueryGuard";
import { useGetIntroOfCity } from "hooks/queries/useCity";
import { City, IntroData } from "shared/types";

interface IntroProps {
  city: City;
}

const introStyles = {
  display: "flex",
  flexDirection: { xs: "column", lg: "row-reverse" },
};

const mapStyles = {
  width: { xs: "100%", lg: "50%" },
  padding: "1rem",

  display: "flex",
  alignItems: "center",
};

const textStyles = {
  width: { xs: "100%", lg: "50%" },

  padding: "1rem",
};

const StyledDescription = styled(Box)`
  &::first-letter {
    font-size: 3em; /* 첫 글자를 크게 만듦 */
    font-weight: bold; /* 굵게 설정 */
    float: left; /* 첫 글자를 왼쪽에 고정 */
    line-height: 1; /* 줄 간격 조정 */
  }

  overflow-wrap: normal;
`;

function Intro({ city, data }: IntroProps & { data: IntroData }) {
  const { description, coord } = data;

  return (
    <Box sx={introStyles}>
      <Box sx={mapStyles}>
        <GoogleMapEmbed coord={coord} />
      </Box>
      <StyledDescription
        className="description"
        sx={textStyles}
        data-city={city}
      >
        {description}
      </StyledDescription>
    </Box>
  );
}

function IntroWithGuard({ city }: IntroProps) {
  const query = useGetIntroOfCity(city);
  return <QueryGuard query={query} Component={Intro} city={city} />;
}

export default IntroWithGuard;
