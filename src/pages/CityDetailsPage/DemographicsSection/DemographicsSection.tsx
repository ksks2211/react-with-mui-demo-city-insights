import { formatNumberWithCommas } from "@utils/numberUtils";
import QueryGuard from "components/guards/QueryGuard";
import { useGetDemographicsOfCity } from "hooks";
import type { City, DemographicsData } from "shared/types";

interface DemographicsProps {
  city: City;
}

function Demographics({
  city,
  data,
}: DemographicsProps & { data: DemographicsData }) {
  const { demographics } = data;

  return (
    <div>
      city : {city}
      {demographics.map((pop) => (
        <div key={pop.Year}>
          {pop.Year} : {formatNumberWithCommas(pop.Population)}
        </div>
      ))}
    </div>
  );
}

function DemographicsWithGuard({ city }: DemographicsProps) {
  const query = useGetDemographicsOfCity(city);

  return <QueryGuard query={query} Component={Demographics} city={city} />;
}

export default DemographicsWithGuard;
