import * as stylex from "@stylexjs/stylex";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import BasicInfoForm from "./BasicInfoForm";
// import AccommodationForm from "./AccommodationForm";
import { Form, Formik } from "formik";
import MealsAndDiningForm from "./MealsAndDiningForm";
import TransportationInfoForm from "./TransportationInfoForm";
import ActivitiesAndAtractionsForm from "./ActivitiesAndAtractionsForm";
import PriceInfoForm from "./PriceInfoForm";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Modal from "./Modal";
import TourPackageForm2 from "./tourType/TourPackageForm2";

const styles = stylex.create({
  base: () => ({
    // height: "calc(100% - 4rem)",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
  }),
  mainLabelContainer: () => ({
    height: "3rem",
    display: "flex",
    alignItems: "center",
    color: "aliceblue",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: "200",
  }),
  // formLabelStyle: () => ({}),
  mainContainer: () => ({
    // width: "45rem",
    // height: "55rem",
    // background: "rgba(255, 255, 255, 0.2)",
    // border: "1px solid rgba(255, 255, 255, 0.3)",
    // borderRadius: "1rem",
    // height:"100%",
    // width: "100%",
    flexGrow: 1,
    display: "flex",
    // gap: "1rem",
    padding: "1rem 1rem 1rem 1rem",
    // paddingLeft:"1rem"
  }),
  formContainer: () => ({
    // height: "calc(100% - 4rem)",
    flexGrow: 1,
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
    gap: "1rem",
    flexWrap: "wrap",
  }),
  // formTopContainer: () => ({
  //   // height: "calc(100% - 4rem)",
  // }),
  buttonContainer: () => ({
    height: "4rem",
  }),
});

const meals = [
  { name: "breakfast", label: "Desayuno", state: false },
  { name: "lunch", label: "Almuerzo", state: false },
  { name: "dinner", label: "Cena", state: false },
];

const MySwal = withReactContent(Swal);

function TourPackageForm2() {
  const params = useParams();
  const initialValues = {
    packageName: "",
    destination: "",
    duration: 1,
    // accommodationType: "",
    // services: "",
    meals: meals.reduce((acc, meal) => {
      acc[meal.name] = meal.state;
      return acc;
    }, {}),
    // mealAdditionalInfo: "",
    departureTime: "",
    arrivalTime: "",
    attractions: [{ name: "" }],
    price: "",
  };

  const validationSchema = Yup.object().shape({
    packageName: Yup.string().required("campo requerido"),
    destination: Yup.string().required("campo requerido"),
    duration: Yup.number()
      .min(1)
      .positive()
      .integer()
      .required("campo requerido"),
    // accommodationType: Yup.string().required("campo requerido"),
    // services: Yup.string().required("campo requerido"),

    meals: Yup.object().shape({
      breakfast: Yup.boolean(),
      lunch: Yup.boolean(),
      dinner: Yup.boolean(),
    }),
    // mealAdditionalInfo: Yup.string().required("campo requerido"),
    departureTime: Yup.string()
      .required("campo requerido")
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Hora no válida (HH:mm)"),
    arrivalTime: Yup.string()
      .required("campo requerido")
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Hora no válida (HH:mm)"),
    attractions: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("campo requerido"),
      })
    ),
    price: Yup.number()
      .min(0)
      .required("campo requerido")
      .typeError("debe ser un numero valido"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    MySwal.fire({
      title: <p>Los siguientes datos seran registrados</p>,
      html: <Modal values={values} />,
      showCancelButton: "true",
      cancelButtonText: <p>Cancelar</p>,
      confirmButtonText: <p>Registrar</p>,
      confirmButtonColor: "rgb(51,153,255)",
      preConfirm: async () => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showCancelButton: false,
          timer: 6000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        try {
          // console.log("values::: ", values);
          Toast.fire({
            icon: "success",
            title: "Registro exitoso",
          });
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      },
    });
    setSubmitting(false);
  };

  return (
    <div {...stylex.props(styles.base())}>
      <div>
        <div {...stylex.props(styles.mainLabelContainer())}>
          <label htmlFor="title">
            {params.id
              ? "Formulario de actualizacion de paquete turistico"
              : "Formulario de registro de paquete turistico"}
          </label>
        </div>
      </div>
      <div {...stylex.props(styles.mainContainer())}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting }) => (
            <Form {...stylex.props(styles.formContainer())}>
              <div>
                <label htmlFor="name">Nombre:</label>
                {/* <TourPackageForm2 /> */}
                {/* <BasicInfoForm /> */}
                {/* <AccommodationForm /> */}
                {/* <MealsAndDiningForm /> */}
                {/* <TransportationInfoForm /> */}
                {/* <ActivitiesAndAtractionsForm /> */}
                {/* <PriceInfoForm /> */}
              </div>
              <div {...stylex.props(styles.buttonContainer())}>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default TourPackageForm2;