import { toTitleCase } from "@utils/stringUtils";
import { useSelectedCity } from "hooks";
import { useRef } from "react";
import SectionDivider, { SectionDividerHandle } from "./SectionDivider";

export default function CityDetailsPage() {
  const { city } = useSelectedCity();
  const sectionRef = useRef<SectionDividerHandle>(null);

  if (!city) {
    throw new Error("Invalid City");
  }

  const handleClick = () => {
    sectionRef.current?.moveTo();
  };

  return (
    <>
      <SectionDivider title={toTitleCase(city)} size="lg"></SectionDivider>

      <SectionDivider title="Demographics" ref={sectionRef}></SectionDivider>

      <SectionDivider title="Economy"></SectionDivider>
      <SectionDivider title="Climate"></SectionDivider>

      <SectionDivider title="Geography"></SectionDivider>

      <SectionDivider title="History"></SectionDivider>
      <SectionDivider title="Gallery">
        The name of the city : {city}
      </SectionDivider>
      <button onClick={handleClick}>Move To the Top</button>
    </>
  );
}
