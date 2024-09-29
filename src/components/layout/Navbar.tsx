import { Box, styled } from "@mui/material";

import { CgClose } from "react-icons/cg";

interface NavbarProps {
  handleClose: () => void;
}

const StyledNavbar = styled(Box)`
  height: 100vh;
  width: var(--sidebar-width);

  background-color: var(--navbar-background);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;

  .navbar-close-btn {
    position: sticky;
    top: 0;
    height: var(--header-height);

    width: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: end;

    background-color: var(--navbar-background);

    svg {
      cursor: pointer;
      width: var(--icon-btn-size);
      height: var(--icon-btn-size);
      padding: var(--icon-btn-padding);
      color: var(--icon-color);
      fill: var(--icon-color);
    }
  }

  .navbar-main-area {
    flex-wrap: 1;
    padding-bottom: calc(var(--header-height) * 2);
  }
`;

export default function Navbar({ handleClose }: NavbarProps) {
  return (
    <StyledNavbar>
      <button
        className="navbar-close-btn"
        children={<CgClose onClick={handleClose} />}
      />

      <div className="navbar-main-area">
        Main Area
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          quaerat itaque minus fugiat mollitia eaque earum tenetur? Totam,
          soluta! Error ab soluta aliquam pariatur? Voluptates veritatis fuga
          tempore quos consectetur. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quam, illum. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Vitae ea inventore, deleniti aliquid aliquam
          laboriosam beatae. Repudiandae, ea possimus officia vitae labore sequi
          dignissimos? Excepturi laboriosam iusto commodi corrupti sed harum
          consectetur deleniti aspernatur quae dolore assumenda, enim cum qui
          suscipit dignissimos voluptatibus esse recusandae unde ad! Expedita
          est harum voluptatibus qui praesentium velit officiis alias optio
          voluptates unde commodi, aut ex consequuntur reprehenderit ducimus
          odit quia, cupiditate quisquam, voluptatum dolorem officia ab
          blanditiis nobis! Cumque ipsum laudantium saepe molestiae sapiente
          vero dolores, consectetur laboriosam architecto libero? Nemo incidunt
          repellendus corporis sunt excepturi! Explicabo voluptatem deleniti
          natus quidem est ducimus?
        </p>
      </div>
    </StyledNavbar>
  );
}
