import { Box } from "@mui/material";
import { toTitleCase } from "@utils/stringUtils";
import LoadingBox from "components/presentational/LoadingBox";
import { useScrollY, useSelectedCity, useTocNavigation } from "hooks";
import { useCallback, useEffect, useRef } from "react";
import SectionDivider, { SectionDividerHandle } from "./SectionDivider";

export default function CityDetailsPage() {
  const { city } = useSelectedCity();
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
      if (top > 20 && top < (window.innerHeight * 2) / 5) {
        setFocusedSection(title);
        break;
      }
    }
  }, [scrollY, setFocusedSection]);

  useEffect(() => {
    setFocusedSection(city || null);
    return () => {
      setFocusedSection(null);
    };
  }, [city, setFocusedSection]);

  const setRef = useCallback((el: SectionDividerHandle | null) => {
    if (sectionRefs.current && el) sectionRefs.current[el.getTitle()] = el;
  }, []);

  if (!city) {
    return <LoadingBox />;
  }

  return (
    <Box marginBottom="10rem">
      <SectionDivider
        title={toTitleCase(city)}
        size="lg"
        ref={setRef}
      ></SectionDivider>

      <SectionDivider title="Demographics" ref={setRef}></SectionDivider>

      <SectionDivider title="Economy" ref={setRef}></SectionDivider>

      <SectionDivider title="Climate" ref={setRef}></SectionDivider>

      <SectionDivider title="Geography" ref={setRef}></SectionDivider>

      <SectionDivider title="History" ref={setRef}></SectionDivider>
      <SectionDivider title="Gallery" ref={setRef}>
        The name of the city : {city}
      </SectionDivider>
    </Box>
  );
}
