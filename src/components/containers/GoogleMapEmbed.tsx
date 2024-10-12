import { Box } from "@mui/material";
import type { BoxProps } from "@mui/system";
import React from "react";
import ContainedIframe from "./ContainedIframe";

const mapStyles = {
  width: { xs: "100%", sm: "90%", lg: "100%" },
  maxWidth: "375px",
  aspectRatio: "3/2",
  margin: "auto",
};

function GoogleMapEmbed(props: BoxProps) {
  const lat = 40.776676;
  const lon = -73.971321;
  const zoom = 10;

  return (
    <Box sx={mapStyles} {...props}>
      <ContainedIframe
        src={`https://www.google.com/maps?q=${lat},${lon}&z=${zoom}&output=embed`}
        width="100%"
        height="100%"
        loading="lazy"
      ></ContainedIframe>
    </Box>
  );
}

export default React.memo(GoogleMapEmbed);
