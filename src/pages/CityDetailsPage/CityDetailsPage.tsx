import { toTitleCase } from "@utils/stringUtils";
import { useSelectedCity, useTocNavigation } from "hooks";
import { useEffect, useRef } from "react";
import SectionDivider, { SectionDividerHandle } from "./SectionDivider";

export default function CityDetailsPage() {
  const { city } = useSelectedCity();
  const sectionRefs = useRef<{ [key: string]: SectionDividerHandle }>({});
  const { tocRef } = useTocNavigation();

  // send moveTo function to context (eventually sidebar)
  useEffect(() => {
    const moveTo = (key: string) => {
      if (sectionRefs.current && sectionRefs.current[key]) {
        sectionRefs.current[key].moveTo();
      }
    };

    tocRef.current = moveTo;

    // clear
    return () => {
      tocRef.current = null;
    };
  }, [tocRef]);

  if (!city) {
    throw new Error("Invalid City");
  }

  const setRef = (el: SectionDividerHandle | null, key: string) => {
    if (sectionRefs.current && el) sectionRefs.current[key] = el;
  };

  return (
    <>
      <SectionDivider
        title={toTitleCase(city)}
        size="lg"
        ref={(el) => setRef(el, city)}
      ></SectionDivider>

      <SectionDivider
        title="Demographics"
        ref={(el) => setRef(el, "Demographics")}
      ></SectionDivider>

      <SectionDivider
        title="Economy"
        ref={(el) => setRef(el, "Economy")}
      ></SectionDivider>

      <SectionDivider
        title="Climate"
        ref={(el) => setRef(el, "Climate")}
      ></SectionDivider>

      <SectionDivider
        title="Geography"
        ref={(el) => setRef(el, "Geography")}
      ></SectionDivider>

      <SectionDivider
        title="History"
        ref={(el) => setRef(el, "History")}
      ></SectionDivider>
      <SectionDivider title="Gallery" ref={(el) => setRef(el, "Gallery")}>
        The name of the city : {city}
      </SectionDivider>
    </>
  );
}
