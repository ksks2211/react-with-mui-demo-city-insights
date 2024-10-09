import { useSelectedCity } from "hooks";
import TocSidebar from "./TocSidebar";

export default function Sidebar() {
  const { city } = useSelectedCity();

  if (city) {
    return <TocSidebar />;
  }

  return <div>sidebar</div>;
}
