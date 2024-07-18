/* eslint-disable react/prop-types */
import * as stylex from "@stylexjs/stylex";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AttractionsModal from "./modals/AttractionsModal";
import CalendarModal from "./modals/CalendarModal";
import ItineraryModal from "./modals/ItineraryModal";
// import { MoreVert } from "@mui/icons-material";
// import { IconButton } from "@mui/material";
import MenuTourType from "./MenuTourType";
import { useNavigate} from "react-router-dom";

const styles = stylex.create({
  base: () => ({
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "flex-start",
    height: "30rem",
    width: "30rem",
    borderRadius: "1rem",
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.2)",
  }),
  contentStyle: () => ({
    color: "aliceblue",
    fontSize: "1.5rem",
    height: "4rem",
    display: "flex",
    alignItems: "center",
    width: "100%",
    // padding: "0 7rem",
    paddingLeft: "1rem",
    // flexDirection: "column",
    // justifyContent: "center",
  }),
  // heightContainer: () => ({
  //   height: "9rem",
  // }),
  titleStyle: () => ({
    // justifyContent: "center",
    width: "30rem",
  }),
  mealsContainer: () => ({
    height: "8rem",
    padding: "0 0 0 10rem",
    color: "aliceblue",
    fontSize: "1.5rem",
    // height: "4rem",
  }),
  buttonsGroup: () => ({
    height: "6rem",
    padding: "1.2rem 1.2rem",
    display: "flex",
    gap: "0.7rem",
  }),
  buttonStyle: () => ({
    height: "100%",
    width: "9rem",
    border: "none",
    borderRadius: "0.4rem",
    cursor: "pointer",
    fontFamily: "Poppins",
  }),
  calendarModalStyle: () => ({
    width: "100rem",
  }),
  nameContainer: () => ({
    height: "100%",
    width: "50rem",
    display: "flex",
    alignItems: "center",
  }),
});

const MySwal = withReactContent(Swal);

function TourTypeCard({ tourType }) {
  // console.log('tourType::: ', tourType);
  // const params = useParams()
  const navigate = useNavigate();
  // console.log("tourType::: ", tourType);

  const showEditTourType = () => {
    // console.log('params::: ', params);
    navigate(`editar/${tourType._id}`);
  };

  const showAtractions = () => {
    MySwal.fire({
      title: "Atracciones",
      html: <AttractionsModal attractions={tourType.attractions} />,
      showCloseButton: true,
    });
  };

  const showAvailableDates = () => {
    MySwal.fire({
      title: "Fechas Disponibles",
      html: (
        <div>
          <CalendarModal
            {...stylex.props(styles.calendarModalStyle())}
            availableDates={tourType.availableDates}
          />
        </div>
      ),
      showCloseButton: true,
      width: 800,
    });
  };

  const showItinerary = () => {
    MySwal.fire({
      title: "Itinerario",
      html: <ItineraryModal itinerary={tourType.itinerary} />,
      showCloseButton: true,
    });
  };

    const handleEdit = () => {
      console.log("editar::: ");
      showEditTourType();
      // console.log('tourTypeId::: ', tourTypeId);
      // navidate(`/tour-type/edit/${tourTypeId}`);
    };
    const handleEnable = () => {
      console.log("habilitar::: ");
    };
    const handleDisable = () => {
      console.log("deshabilitar::: ");
    };
    const options = [
      { label: "editar", action: handleEdit },
      { label: "deshabilitar", action: handleDisable },
      { label: "habilitar", action: handleEnable },
    ];

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.contentStyle(), styles.titleStyle())}>
        <div {...stylex.props(styles.nameContainer())}>
          <label htmlFor="tourType.name">{tourType.name}</label>
        </div>
        <MenuTourType tourTypeId={tourType._id} showEditTourType={ showEditTourType} options={options}/>
      </div>
      <div {...stylex.props(styles.contentStyle())}>
        <label htmlFor="tourType.available">
          Estado: {tourType.available ? "Activo" : "Inactivo"}
        </label>
      </div>
      <div {...stylex.props(styles.contentStyle())}>
        <label htmlFor="">Precio: {tourType.price} Bs.</label>
      </div>
      <div {...stylex.props(styles.contentStyle())}>
        <label htmlFor="tourType.meals">Regimen alimenticio:</label>
      </div>
      <div {...stylex.props(styles.mealsContainer())}>
        <p>Desayuno: {tourType.meals.breakfast ? "Si" : "No"}</p>
        <p>Almuerzo: {tourType.meals.lunch ? "Si" : "No"}</p>
        <p>Cena: {tourType.meals.dinner ? "Si" : "No"}</p>
      </div>
      <div {...stylex.props(styles.buttonsGroup())}>
        <button
          type="button"
          onClick={showAtractions}
          {...stylex.props(styles.buttonStyle())}
        >
          Atractivos
        </button>
        <button
          type="button"
          onClick={showAvailableDates}
          {...stylex.props(styles.buttonStyle())}
        >
          Fechas
        </button>
        <button
          type="button"
          onClick={showItinerary}
          {...stylex.props(styles.buttonStyle())}
        >
          Itinerario
        </button>
      </div>
    </div>
  );
}
export default TourTypeCard;
