import * as stylex from "@stylexjs/stylex";
import { useTourPackages } from "../../../context/tourPackage/TourPackageProvider";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const styles = stylex.create({
  base: () => ({
    height: "100%",
    width: "100%",
  }),
  titleContainer: () => ({
    height: "5rem",
    fontSize: "1.5rem",
    color: "aliceblue",
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
  }),
  titleStyle: () => ({
    width:"100%",
    display:"flex",
    justifyContent: "center",
    padding:"0 16rem 0 0"
  }),
  bottomContainer: () => ({
    height: "calc(100% - 4rem)",
  }),
  cardsContainer: () => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }),
  buttonContainer: () => ({
    padding: "0 0 0 1rem",
  }),
  buttonStyle: () => ({
    height: "3rem",
    width: "15rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontFamily: "Poppins",
  }),
});

function TourTypes() {
  const params = useParams();
  const { tourPackages } = useTourPackages();
  const [tourPackage, setTourPackage] = useState({});
  const navigate = useNavigate();
  const loadTourPackage = () => {
    if (params.id) {
      const tourPackage =
        tourPackages.find((tourPackage) => tourPackage._id === params.id) || {};
      setTourPackage(tourPackage);
      // console.log("tourPackage::: ", tourPackage);
    }
  };

  // const showTourTypes = () => {
  //   console.log("::: ", tourPackage.tourTypes);
  //   // navigate("nuevo");
  // };
  // const navigateToRegisterTourType = () => {
  //   navigate("nuevo");
  // };

  useEffect(() => {
    loadTourPackage();
  }, [tourPackages]);
  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.titleContainer())}>
        <div {...stylex.props(styles.buttonContainer())}>
          <button
            type="button"
            onClick={() => navigate("nuevo")}
            {...stylex.props(styles.buttonStyle())}
          >
            Agregar tour
          </button>
        </div>
        <div {...stylex.props(styles.titleStyle())}>
          <label htmlFor="title">Paquete turistico: {tourPackage.name}</label>
        </div>
      </div>
      <div {...stylex.props(styles.bottomContainer())}>
        {/* {tourPackage.tourTypes > 0 ? (
          <div {...stylex.props(styles.cardsContainer())}>
            <div {...stylex.props(styles.titleContainer())}>
              <label htmlFor="title">aqui van los cards{showTourTypes}</label>
            </div>
          </div>
        ) : (
          <div {...stylex.props(styles.cardsContainer())}>
            <label htmlFor="title" {...stylex.props(styles.titleContainer())}>
              No hay tours registrados
            </label>
          </div>
        )} */}
        <Outlet />
      </div>
      {/* <div {...stylex.props(styles.buttonContainer())}>
        <button
          type="button"
          onClick={navigateToRegisterTourType}
          {...stylex.props(styles.buttonStyle())}
        >
          Registrar tour
        </button>
      </div> */}
    </div>
  );
}
export default TourTypes;
