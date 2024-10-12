import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";

function GiscusComments({ city }: { city: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");

    const config = {
      src: "https://giscus.app/client.js",
      "data-repo": "ksks2211/utterances",
      "data-repo-id": "R_kgDOKUYlIw",
      "data-category": "Announcements",
      "data-category-id": "DIC_kwDOKUYlI84CjR0X",
      "data-mapping": "pathname",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": "light",
      "data-lang": "en",
      "data-loading": "lazy",
      crossOrigin: "anonymous",
      async: true,
    };
    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value as string);
    });

    const container = ref.current;

    if (container?.childNodes.length === 0) {
      container?.append(script);
    }

    return () => {
      script.remove();

      if (container) {
        container.innerHTML = "";
      }
    };
  }, [city]);

  return (
    <Box
      ref={ref}
      sx={{
        marginTop: "3.9rem",
        padding: "0 1.5rem",
        width: "100%",
      }}
    />
  );
}

export default React.memo(GiscusComments);
