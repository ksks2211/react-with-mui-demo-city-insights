import { Box, styled } from "@mui/material";
import { useTocNavigation } from "hooks";
import { useEffect, useRef } from "react";

const StyledSidebar = styled(Box)`
  --sidebar-margin-top: 5.5rem;
  width: 100%;

  // stick to the top
  position: sticky;
  top: var(--header-height);
  margin-top: var(--sidebar-margin-top);

  padding: 3.5rem 1rem 0 1rem;
  ul {
    max-height: calc(100vh - var(--header-height) - var(--footer-height));
    overflow: auto;

    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

    padding: 1rem 0;
    li {
      cursor: pointer;
      /* font-weight: 400; */
      font-size: 1rem;
      padding: 0.3rem 0 0.3rem 1rem;
      color: ${({ theme }) => theme.palette.grey[700]};

      &:hover {
        font-weight: 700;
      }
    }
  }
`;

export default function Sidebar() {
  const { tocRef } = useTocNavigation();

  const timeoutRef = useRef<NodeJS.Timeout | number | null>(null);

  const clearTimeoutIfExists = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // clear timeout;
  useEffect(() => {
    return () => {
      clearTimeoutIfExists();
    };
  }, []);

  const topics = [
    "Demographics",
    "Economy",
    "Climate",
    "Geography",
    "History",
    "Gallery",
  ];

  const handleClick = (topic: string) => {
    if (tocRef.current) {
      tocRef.current(topic);
    }

    setTimeout(() => {
      if (tocRef.current) tocRef.current(topic);
    }, 450);

    clearTimeoutIfExists();
    timeoutRef.current = setTimeout(() => {
      if (tocRef.current) tocRef.current(topic);
    }, 900);
  };

  return (
    <StyledSidebar className="bottom">
      <ul>
        {topics.map((topic) => (
          <li key={topic} onClick={() => handleClick(topic)}>
            {topic}
          </li>
        ))}
      </ul>
    </StyledSidebar>
  );
}
