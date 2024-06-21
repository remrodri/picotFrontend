import * as stylex from "@stylexjs/stylex";
import { Outlet, useNavigate } from "react-router-dom";
import { useTourPackages } from "../../context/tourPackage/TourPackageProvider";
import { useEffect } from "react";

const styles = stylex.create({
  base: () => ({
    borderTopRightRadius: "1.6rem",
    borderBottomRightRadius: "1.6rem",
    height: "100%",
    background: "rgba(35,39,46,0.57)",
    boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
    backdropFilter: "blur(13px)",
    border: "1px solid rgba(0,0,0,0.3)",
    padding: "1rem",
    gap: "1rem",
    display: "flex",
    flexDirection: "column",
  }),
  topContainer: () => ({
    // background: "rgba(35, 39, 46, 0.57)",
    border: "1px solid rgba(0,0,0,0.3)",
    boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
    // background: "rgba(255,255,255,0.2)",
    // border: "1px solid rgba(255,255,255,0.3)",
    // boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
    backdropFilter: "blur(5px)",
    borderTopRightRadius: "1rem",
    height: "8rem",
    display: "flex",
    flexDirection: "column",
    // backdropFilter: "blur(5px)",
  }),
  labelTopContainer: () => ({
    height: "3rem",
    width: "100%",
    alignContent: "center",
    paddingLeft: "1rem",
  }),
  labelTopContainerStyle: () => ({
    fontSize: "1.5rem",
    color: "aliceblue",
    fontWeight: "200",
  }),
  buttonsContainer: () => ({
    // flexGrow: 1,
    height:"4.8rem",
    padding: "1rem 1rem 1rem 1rem",
  }),
  buttonStyle: () => ({
    fontFamily: "Poppins",
    border: "none",
    height: "100%",
    width: "15rem",
    borderRadius: "0.5rem",
    background: {
      default: "rgb(0, 127, 255)",
      ":hover": "rgb(0, 110, 255)",
    },
    color: "aliceblue",
  }),
  bottomContainer: () => ({
    flexGrow: 1,
    borderBottomRightRadius: "1rem",
    background: "rgba(35,39,46,0.57)",
    // background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(0,0,0,0.3)",
    // border: "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
    // backdropFilter: "blur(5px)",
    overflowY: "auto",
    display:"flex"
  }),
});

function TourPackageComponent() {
  const { loadTourPackages } = useTourPackages()
  
  useEffect(() => {
    loadTourPackages()
  },[])

  const navigate = useNavigate();
  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.topContainer())}>
        <div {...stylex.props(styles.labelTopContainer())}>
          <label
            htmlFor="title"
            {...stylex.props(styles.labelTopContainerStyle())}
          >
            Gestion de paquetes turisticos
          </label>
        </div>
        <div {...stylex.props(styles.buttonsContainer())}>
          <button
            {...stylex.props(styles.buttonStyle())}
            onClick={() => navigate("nuevo")}
          >
            Nuevo
          </button>
        </div>
      </div>
      <div {...stylex.props(styles.bottomContainer())}>
        <Outlet />
      </div>
    </div>
  );
}
export default TourPackageComponent;
