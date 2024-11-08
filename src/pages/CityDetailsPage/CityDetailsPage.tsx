import { Box } from "@mui/material";
import { toTitleCase } from "@utils/stringUtils";
import GiscusComments from "components/containers/GiscusComments";
import SuspenseLoader from "components/containers/SuspenseLoader.tsx";
import LoadingBox from "components/presentational/LoadingBox";

import { useSelectedCity, useTocNavigation } from "hooks";
import { lazy, useCallback, useEffect, useRef } from "react";
import type { City } from "shared/types";
import SectionDivider from "./SectionDivider";
import type { SectionDividerHandle } from "./types";

const Intro = lazy(() => import("./IntroSection/IntroSection.tsx"));
const Demographics = lazy(
  () => import("./DemographicsSection/DemographicsSection.tsx")
);

function CityDetailsPage({ city }: { city: City }) {
  const sectionRefs = useRef<{ [key: string]: SectionDividerHandle }>({});
  const { tocRef, setFocusedSection } = useTocNavigation();

  // attach moveTo function to context for sidebar toc
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

  useEffect(() => {
    setFocusedSection(city ? toTitleCase(city) : null);

    return () => {
      setFocusedSection(null);
    };
  }, [city, setFocusedSection]);

  const setRef = useCallback((el: SectionDividerHandle | null) => {
    if (sectionRefs.current && el) sectionRefs.current[el.getTitle()] = el;
  }, []);

  return (
    <Box marginBottom="10rem">
      <SectionDivider title={toTitleCase(city)} size="lg" ref={setRef}>
        <SuspenseLoader children={<Intro city={city} />} />
      </SectionDivider>

      <SectionDivider title="Demographics" ref={setRef}>
        <SuspenseLoader children={<Demographics city={city} />} />
      </SectionDivider>

      <SectionDivider title="Economy" ref={setRef}></SectionDivider>

      <SectionDivider title="Climate" ref={setRef}></SectionDivider>

      <SectionDivider title="Geography" ref={setRef}></SectionDivider>

      <SectionDivider title="History" ref={setRef}></SectionDivider>
      <SectionDivider title="Gallery" ref={setRef}>
        The name of the city : {city}
      </SectionDivider>

      <GiscusComments city={city} />
    </Box>
  );
}

export default function CityDetailsPageWithGuard() {
  const { city } = useSelectedCity();

  if (!city) {
    return <LoadingBox />;
  }

  return <CityDetailsPage city={city} />;
}
