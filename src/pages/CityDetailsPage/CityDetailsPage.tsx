import { Box } from "@mui/material";
import { toTitleCase } from "@utils/stringUtils";
import GiscusComments from "components/containers/GiscusComments";
import SuspenseLoader from "components/containers/SuspenseLoader.tsx";
import LoadingBox from "components/presentational/LoadingBox";

import { useScrollY, useSelectedCity, useTocNavigation } from "hooks";
import React, { lazy, useCallback, useEffect, useRef } from "react";
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
  const { scrollY } = useScrollY();

  // attach moveTo function to context (eventually sidebar)
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

  // on scroll detect section in the main zone
  useEffect(() => {
    if (!sectionRefs.current) return;

    for (const [title, handler] of Object.entries(sectionRefs.current)) {
      const top = handler.readTop();
      const bottom = handler.readBottom();

      if (top > 20 && top < (window.innerHeight * 2) / 5) {
        setFocusedSection(title);
        break;
      } else if (
        bottom > (window.innerHeight * 3) / 5 &&
        bottom < window.innerHeight
      ) {
        setFocusedSection(title);
        break;
      }
    }
  }, [scrollY, setFocusedSection]);

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

const CityDetailsPageWithMemo = React.memo(CityDetailsPage);

export default function CityDetailsPageWithGuard() {
  const { city } = useSelectedCity();

  if (!city) {
    return <LoadingBox />;
  }

  return <CityDetailsPageWithMemo city={city} />;
}
