/* eslint-disable react/prop-types */
import { MoreVert } from "@mui/icons-material";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTourPackages } from "../../context/tourPackage/TourPackageProvider";

const styles = stylex.create({
  base: () => ({
    width: "35rem",
    height: "10rem",
    background: "rgb(225,233,252)",
    borderRadius: "0.5rem",
    padding: "1rem",
    display: "flex",
    position: "relative",
    // flexDirection: "column",
    // gap: "1rem",
    // justifyContent: "center",
  }),
  infoContainer: () => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    fontSize: "1.5rem",
    justifyContent: "center",
    width: "33rem",
  }),
  lineInfoContainer: () => ({
    display: "flex",
    gap: "1rem",
    // width: "90%",
    // justifyContent:"space-between"
  }),
  menuIconContainer: () => ({
    height: "3rem",
    width: "2rem",
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
  }),
  menuIconStyle: () => ({
    fontSize: "3rem",
    position: "absolute",
  }),
  menuButtonsStyle: () => ({ zIndex: 1 }),
  buttonStyle: () => ({
    width: "7rem",
  }),

  labelStyle: () => ({
    width: "8rem",
    paddingLeft: "1rem",
  }),
  hidden: () => ({
    display: "none",
  }),
});

function TourPackageCard(props) {
  const { tourPackage } = props;
  const { updateTourPackage } = useTourPackages();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const translateType = () => {
    if (tourPackage.type === "national") {
      return "Nacional";
    } else if (tourPackage.type === "international") {
      return "Internacional";
    }
  };

  const showTypeTours = () => {
    console.log("::: mostrar los type tours");
  };

  const toggleAvailability = () => {
    // console.log("::: cambiar el estado de tourPackage");
    const newStatus = tourPackage.status==="available"? "unavailable" : "available";
    // console.log('newStatus::: ', newStatus);

    updateTourPackage(tourPackage._id, { status: newStatus });
  };

  const editTourPackage = () => {
    console.log("::: editar la info");
    navigate(`editar/${tourPackage._id}`);
  };

  // console.log("tourPackage::: ", tourPackage);
  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.infoContainer())}>
        <div {...stylex.props(styles.lineInfoContainer())}>
          <label htmlFor="information" {...stylex.props(styles.labelStyle())}>
            Nombre:
          </label>
          <p>{tourPackage.name}</p>
        </div>
        <div {...stylex.props(styles.lineInfoContainer())}>
          <label htmlFor="destination" {...stylex.props(styles.labelStyle())}>
            Destino:
          </label>
          <p>{tourPackage.destination}</p>
        </div>
        <div {...stylex.props(styles.lineInfoContainer())}>
          <label htmlFor="type" {...stylex.props(styles.labelStyle())}>
            Tipo:
          </label>
          <p>{translateType()}</p>
        </div>
      </div>
      <div
        {...stylex.props(styles.menuIconContainer())}
        onClick={toggleMenu}
        // onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
      >
        <MoreVert {...stylex.props(styles.menuIconStyle())} />
        {isMenuOpen && (
          <div
            onMouseLeave={toggleMenu}
            {...stylex.props(styles.menuButtonsStyle())}
          >
            <button
              {...stylex.props(styles.buttonStyle())}
              onClick={showTypeTours}
            >
              ver tours
            </button>
            <button
              {...stylex.props(styles.buttonStyle())}
              onClick={toggleAvailability}
            >
              {tourPackage.status === "available" ? "inhabilitar" : "habilitar"}
            </button>
            <button
              {...stylex.props(styles.buttonStyle())}
              onClick={editTourPackage}
            >
              editar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default TourPackageCard;
