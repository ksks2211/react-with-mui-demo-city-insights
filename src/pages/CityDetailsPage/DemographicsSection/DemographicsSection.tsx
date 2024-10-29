import { Box } from "@mui/material";
import SuspenseLoader from "components/containers/SuspenseLoader";
import QueryGuard from "components/guards/QueryGuard";
import { useGetDemographicsOfCity } from "hooks";
import { lazy } from "react";
import type { City, DemographicsData } from "shared/types";

const DemographicsLineGraph = lazy(
  () => import("../../../components/containers/DemographicsLineGraph.tsx")
);

interface DemographicsProps {
  city: City;
}

const graphBoxStyles = {
  width: {
    xs: "100%",
    sm: "60%",
    md: "70%",
    xl: "50%",
  },
  height: {
    xs: 350,
    sm: 450,
  },
  padding: "2rem 1rem 1rem 0",
};

function Demographics({
  city,
  data,
}: DemographicsProps & { data: DemographicsData }) {
  const { demographics } = data;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop="1rem"
    >
      <Box sx={graphBoxStyles}>
        <SuspenseLoader
          children={
            <DemographicsLineGraph
              populations={demographics}
              city={city}
              height="100%"
              width="100%"
            />
          }
        />
      </Box>
    </Box>
  );
}

function DemographicsWithGuard({ city }: DemographicsProps) {
  const query = useGetDemographicsOfCity(city);

  return <QueryGuard query={query} Component={Demographics} city={city} />;
}

export default DemographicsWithGuard;
