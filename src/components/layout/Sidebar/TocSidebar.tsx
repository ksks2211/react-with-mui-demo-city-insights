import { Box, styled } from "@mui/material";
import { toTitleCase } from "@utils/stringUtils";
import cn from "classnames";
import { useTocNavigation } from "hooks";
import { useEffect, useRef } from "react";
import type { City, TargetedEvent } from "shared/types";
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

export default function Sidebar({ city }: { city: City }) {
  const { tocRef, focusedSection } = useTocNavigation();

  const timeoutIdRef = useRef<NodeJS.Timeout | number | null>(null);

  const clearTimeoutIfExists = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  // clear timeout;
  useEffect(() => {
    return () => {
      clearTimeoutIfExists();
    };
  }, [city]);

  const topics = [
    toTitleCase(city),
    "Demographics",
    "Economy",
    "Climate",
    "Geography",
    "History",
    "Gallery",
  ];

  const handleClick = ({ currentTarget }: TargetedEvent) => {
    const topic = currentTarget.dataset.topic || city;

    if (tocRef.current) {
      tocRef.current(topic);
    }

    setTimeout(() => {
      if (tocRef.current) tocRef.current(topic);
    }, 450);

    clearTimeoutIfExists();
    timeoutIdRef.current = setTimeout(() => {
      if (tocRef.current) tocRef.current(topic);
    }, 900);
  };

  return (
    <StyledSidebar className="bottom">
      <ul>
        {topics.map((topic) => (
          <li
            key={topic}
            data-topic={topic}
            onClick={handleClick}
            className={cn({ focused: focusedSection === topic })}
          >
            {topic}
          </li>
        ))}
      </ul>
    </StyledSidebar>
  );
}
