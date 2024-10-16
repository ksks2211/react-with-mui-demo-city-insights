import { Box, styled } from "@mui/material";
import GoogleMapBox from "components/containers/GoogleMapBox";
import QueryGuard from "components/guards/QueryGuard";
import { useGetIntroOfCity } from "hooks/queries/useCity";
import { IntroData } from "shared/types";
import { IntroProps, introStyles, mapStyles, textStyles } from "./types";

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
        <GoogleMapBox coord={coord} city={city} />
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
