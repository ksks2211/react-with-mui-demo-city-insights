import { Box, styled } from "@mui/material";
import { toTitleCase } from "@utils/stringUtils";
import cn from "classnames";
import { useTocNavigation } from "hooks";
import { useEffect, useRef } from "react";
const StyledSidebar = styled(Box)`
  --padding-top: 3.5rem;
  width: 100%;

  // stick to the top
  position: sticky;
  top: var(--header-height);

  padding: var(--padding-top) 1rem 0 1rem;
  ul {
    max-height: calc(
      100vh - var(--header-height) - var(--footer-height) + var(--padding-top)
    );
    overflow: auto;

    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

    padding: 0 0 1rem;
    li {
      cursor: pointer;
      font-size: 0.95rem;
      padding: 0.27rem 0 0.27rem 1rem;
      color: ${({ theme }) => theme.palette.grey[700]};

      transition: 0.3s;
      &:not(:first-of-type):hover,
      &:not(:first-of-type).focused {
        font-weight: 700;
        transform: translateX(-2px);
      }
    }

    li:first-of-type {
      font-size: 1.2rem;
      font-weight: 900;
      text-align: center;
      margin-bottom: 0.5rem;
      padding: 10px 0;
      background-color: ${({ theme }) => theme.palette.grey[200]};

      &.focused {
        color: var(--accent-color);
      }
    }
  }
`;

export default function Sidebar({ city }: { city: string }) {
  const { tocRef, focusedSection } = useTocNavigation();

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
    city,
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
          <li
            key={topic}
            onClick={() => handleClick(topic)}
            className={cn({ focused: focusedSection === topic })}
          >
            {toTitleCase(topic)}
          </li>
        ))}
      </ul>
    </StyledSidebar>
  );
}
