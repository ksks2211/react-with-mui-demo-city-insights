import { extractStartAndEnd, formatNumberWithCommas } from "@utils/numberUtils";
import QueryGuard from "components/guards/QueryGuard";
import { useGetDemographicsOfCity, useLockBodyScroll, useModal } from "hooks";
import { map } from "lodash-es";
import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Demographic } from "shared/types";

// Line Graph 넣기

// Graph 라이브러리
// Table 라이브러리

interface DemographicsProps {
  data: Demographic;
}

function Demographics({ data }: DemographicsProps) {
  const { populations } = data;
  const { startAt, endAt } = extractStartAndEnd(map(populations, "Year"));
  const { openModal, isModalVisible, closeModal, setIsUserTriggered } =
    useModal();
  useLockBodyScroll(isModalVisible);
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  // catch modal from search-params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    if (id === null && isModalVisible) {
      closeModal();
    } else if (id !== null && !isModalVisible) {
      openModal(<h3>What I passed to the modal</h3>);
    }
  }, [closeModal, isModalVisible, search, navigate, openModal]);

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
      {populations.map((pop) => (
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
