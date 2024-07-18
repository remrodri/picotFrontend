/* eslint-disable react/prop-types */
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
// import { useNavigate } from "react-router-dom";

const styles = stylex.create({
  optionStyle: () => ({
    fontSize: "1.3rem",
  }),
  iconStyle: () => ({
    color: "aliceblue",
  }),
});

function MenuTourType({ options }) {
  // const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // const handleEdit = () => {
  //   console.log("editar::: ");
  //   showEditTourType();
  //   // console.log('tourTypeId::: ', tourTypeId);
  //   // navidate(`/tour-type/edit/${tourTypeId}`);
  // };
  // const handleEnable = () => {
  //   console.log("habilitar::: ");
  // };
  // const handleDisable = () => {
  //   console.log("deshabilitar::: ");
  // };
  // const options = [
  //   { label: "editar", action: handleEdit },
  //   { label: "deshabilitar", action: handleDisable },
  //   { label: "habilitar", action: handleEnable },
  // ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="more-button"
        aria-controls={open ? "more-button" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert fontSize="large" {...stylex.props(styles.iconStyle())} />
      </IconButton>
      <Menu
        id="more-button"
        MenuListProps={{
          "aria-labelledby": "more-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => {
              option.action();
              handleClose();
            }}
            {...stylex.props(styles.optionStyle())}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
export default MenuTourType;
