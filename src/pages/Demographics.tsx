import { extractStartAndEnd, formatNumberWithCommas } from "@utils/numberUtils";
import QueryGuard from "components/guards/QueryGuard";
import { useGetDemographicsOfCity, useLockBodyScroll, useModal } from "hooks";
import { map } from "lodash-es";
import { useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { DemographicsData } from "shared/types";

// Line Graph 넣기

// Graph 라이브러리
// Table 라이브러리

interface DemographicsProps {
  data: DemographicsData;
}

function Demographics({ data }: DemographicsProps) {
  const { demographics } = data;
  const { startAt, endAt } = extractStartAndEnd(map(demographics, "Year"));
  const { openModal, isModalVisible, closeModal, setIsUserTriggered } =
    useModal();
  useLockBodyScroll(isModalVisible);
  const { search } = useLocation();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  // catch modal from search-params
  useEffect(() => {
    const id = searchParams.get("id");

    if (id === null && isModalVisible) {
      closeModal();
    } else if (id !== null && !isModalVisible) {
      console.log("Open modal");
      openModal(<h3>What I passed to the modal</h3>);
    }
  }, [closeModal, isModalVisible, search, navigate, openModal, searchParams]);

  // throw modal to search-params
  const handleClick = () => {
    searchParams.set("id", "123");
    navigate(`?${searchParams.toString()}`, { replace: false });
    setIsUserTriggered(true);
  };

  return (
    <div>
      <h1>
        Population of Seoul ({startAt} ~ {endAt})
      </h1>
      {demographics.map((pop) => (
        <div key={pop.Year}>
          {pop.Year} : {formatNumberWithCommas(pop.Population)}
        </div>
      ))}

      <Link to="/">Main</Link>
      <button onClick={handleClick}>Modal</button>
    </div>
  );
}

export default function DemographicsWithGuard() {
  const query = useGetDemographicsOfCity("seoul");
  return <QueryGuard query={query} Component={Demographics} />;
}
