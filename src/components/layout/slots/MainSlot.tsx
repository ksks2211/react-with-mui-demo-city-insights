import { Box, styled } from "@mui/material";

interface MainSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  "data-large-screen": boolean;
}

const StyledMainSlot = styled(Box)<MainSlotProps>`
  background-color: var(--main-background);
  flex-grow: 1;

  height: 300vh;

  margin-left: ${(props) =>
    props["data-large-screen"] ? "var(--sidebar-width)" : "0"};

  //tmp
`;

export default function Main(props: MainSlotProps) {
  return (
    <StyledMainSlot data-large-screen={props["data-large-screen"]}>
      {props.children}
    </StyledMainSlot>
  );
}
