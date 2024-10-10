import { useSelectedCity } from "hooks";
import TocSidebar from "./TocSidebar";

export default function Sidebar() {
  const { city } = useSelectedCity();

  if (city) {
    return <TocSidebar city={city}/>;
  }

  return <div>sidebar</div>;
}
