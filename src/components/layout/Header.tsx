import { Typography } from "@mui/material";
import { LuMenu } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { StyledHeader, StyledMenuButton } from "./styled";
import { HeaderProps, headerTypographyProps } from "./types";

const HEADER_TITLE = "City Insights" as const;

export default function Header({ handleToggle, isLargeScreen }: HeaderProps) {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <StyledHeader>
      <Typography
        variant="h2"
        {...headerTypographyProps}
        onClick={handleLogoClick}
      >
        {HEADER_TITLE}
      </Typography>

      <StyledMenuButton
        onClick={handleToggle}
        className="menu-btn icon-btn"
        data-large-screen={isLargeScreen}
      >
        <LuMenu />
      </StyledMenuButton>
    </StyledHeader>
  );
}
