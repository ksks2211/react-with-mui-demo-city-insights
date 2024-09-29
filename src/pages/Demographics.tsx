import { extractStartAndEnd, formatNumberWithCommas } from "@utils/numberUtils";
import QueryGuard from "components/guards/QueryGuard";
import { useGetDemographicsOfCity, useLockBodyScroll, useModal } from "hooks";
import { map } from "lodash-es";
import { Link } from "react-router-dom";
import { Demographic } from "shared/types";

// Line Graph 넣기

// Graph 라이브러리
// Table 라이브러리

interface DemographicsProps {
  data: Demographic;
}

function Demographics({ data }: DemographicsProps) {
  const populations = data.populations;
  const { startAt, endAt } = extractStartAndEnd(map(populations, "Year"));

  const { openModal, isModalVisible } = useModal();
  useLockBodyScroll(isModalVisible);

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
      <button
        onClick={() => {
          openModal(<h3>What I passed to the modal</h3>);
        }}
      >
        Modal
      </button>
    </div>
  );
}

export default function DemographicsWithGuard() {
  const query = useGetDemographicsOfCity("seoul");
  return <QueryGuard query={query} Component={Demographics} />;
}
