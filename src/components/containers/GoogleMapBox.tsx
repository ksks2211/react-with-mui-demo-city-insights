import { Box, styled } from "@mui/material";
import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import React, { useRef } from "react";

import type { BoxProps } from "@mui/system";
import type { Libraries } from "@react-google-maps/api";
import type { City, Coordinates } from "shared/types";

const mapStyles = {
  width: { xs: "100%", sm: "90%", lg: "100%" },
  maxWidth: "375px",
  aspectRatio: "3/2",
  margin: "auto",
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

const StyledMap = styled(Box)`
  .custom-marker {
    position: relative;
    width: 12px;
    height: 12px;
  }
  .pin {
    width: 100%;
    height: 100%;
    background-color: #ff4757;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .pulse {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 71, 87, 0.5);
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    animation: pulse 1s infinite;
  }
`;

const zoom = 10 as const;

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const googleMapId = import.meta.env.VITE_GOOGLE_MAP_ID;
const googleMapOptions = {
  mapId: googleMapId,
};

const libraries: Libraries = ["marker"];

function GoogleMapBox({
  coord,
  ...rest
}: BoxProps & { coord: Coordinates; city: City }) {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  const onUnmount = () => {
    if (markerRef.current) {
      markerRef.current.map = null; // Detaches the marker from the map
      markerRef.current.remove();
      markerRef.current = null;
    }
  };

  const onLoad = (map: google.maps.Map) => {
    const customContent = document.createElement("div");
    customContent.innerHTML = `<div class="custom-marker"><div class="pin"></div>
        <div class="pulse"></div></div>`;

    // remove if ref exists
    onUnmount();

    markerRef.current = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: center,
      content: customContent,
    });
  };

  const center = { lat: coord.lat, lng: coord.lon };

  return (
    <StyledMap sx={mapStyles} {...rest}>
      <LoadScriptNext
        googleMapsApiKey={googleMapsApiKey}
        libraries={libraries}
        onUnmount={onUnmount}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={googleMapOptions}
          onLoad={onLoad}
        ></GoogleMap>
      </LoadScriptNext>
    </StyledMap>
  );
}

export default React.memo(
  GoogleMapBox,
  (prevProps, nextProps) => prevProps.city === nextProps.city
);
