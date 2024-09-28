import { extractStartAndEnd, formatNumberWithCommas } from "@utils/numberUtils";
import { useGetDemographicsOfCity } from "hooks/queries/useCity";
import { map } from "lodash-es";
import { Link } from "react-router-dom";
import ErrorFallback from "./ErrorFallbackPage";

// Line Graph 넣기

// Graph 라이브러리
// Table 라이브러리
export default function Demographics() {
  const { data, isLoading, error, refetch } = useGetDemographicsOfCity("seoul");

  if (isLoading) return <div>Loading....</div>;

  if (error)
    return <ErrorFallback error={error} resetErrorBoundary={refetch} />;

  if (data === undefined)
    return (
      <ErrorFallback
        error={new Error("Not Found")}
        resetErrorBoundary={refetch}
      />
    );

  const populations = data.populations;
  const { startAt, endAt } = extractStartAndEnd(map(populations, "Year"));

  return (
    <div>
      <h1>
        Population of Seoul ({startAt} ~ {endAt})
      </h1>
      {populations.map((pop) => (
        <div key={pop.Year}>
          {pop.Year} : {formatNumberWithCommas(pop.Population)}
        </div>
      ))}

      <Link to="/">Main</Link>
    </div>
  );
}
