import { Box } from "@mui/material";
import { toTitleCase } from "@utils/stringUtils";
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

  if (!city) {
    throw new Error("Invalid City");
  }

  const setRef = useCallback((el: SectionDividerHandle | null, key: string) => {
    if (sectionRefs.current && el) sectionRefs.current[key] = el;
  }, []);

  return (
    <Box marginBottom="10rem">
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
    </Box>
  );
}
