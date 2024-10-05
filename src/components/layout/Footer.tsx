import { Container } from "@mui/material";
import { getCurrentDateInfo } from "@utils/dateUtils";
import { StyledFooter } from "./styled";

export default function Footer() {
  const { year } = getCurrentDateInfo();

  return (
    <StyledFooter component="footer">
      <Container
        maxWidth="sm"
        component="footer"
        sx={{
          paddingTop: "1.2rem",
          paddingBottom: "1.6rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
        }}
      >
        <p className="footer-content-bottom">
          © Copyright {year}. All Rights Reserved.
        </p>
      </Container>
    </StyledFooter>
  );
}
