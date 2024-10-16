import { Container } from "@mui/material";
import { getCurrentDateInfo } from "@utils/dateUtils";
import { StyledFooter } from "./styled";

const footerStyles = {
  paddingTop: "1.2rem",
  paddingBottom: "1.6rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "end",
};

export default function Footer() {
  const { year } = getCurrentDateInfo();
  return (
    <StyledFooter component="footer">
      <Container maxWidth="sm" component="footer" sx={footerStyles}>
        <p className="footer-content-bottom">
          © Copyright {year}. All Rights Reserved.
        </p>
      </Container>
    </StyledFooter>
  );
}
