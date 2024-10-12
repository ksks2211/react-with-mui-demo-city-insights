import { Box, BoxProps, styled } from "@mui/material";

const StyledRatioBox = styled(Box)`
  background-color: orange;
`;

const StyledRatioContent = styled(Box)`
  background-color: aquamarine;
  position: relative;
  padding-top: 50%;

  & > * {
    background-color: bisque;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const RatioBox: React.FC<BoxProps> = ({ children, sx, ...rest }: BoxProps) => {
  return (
    <StyledRatioBox {...rest} sx={sx}>
      <StyledRatioContent>{children}</StyledRatioContent>
    </StyledRatioBox>
  );
};

export default RatioBox;
