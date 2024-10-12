import { Box, styled } from "@mui/material";
import GoogleMapEmbed from "components/containers/GoogleMapEmbed";
import React from "react";

interface IntroProps {
  city: string;
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

const description =
  "New York, often called New York City or NYC, is the most populous city in the United States, located at the southern tip of New York State on one of the world's largest natural harbors. The city comprises five boroughs, each coextensive with a respective county. New York is a global center of finance and commerce, culture, technology, entertainment and media, academics and scientific output, the arts and fashion, and, as home to the headquarters of the United Nations, international diplomacy.";

function Intro({ city }: IntroProps) {
  return (
    <Box sx={introStyles}>
      <Box sx={mapStyles}>
        <GoogleMapEmbed />
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

export default React.memo(Intro);
