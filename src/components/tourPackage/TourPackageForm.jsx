/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import * as stylex from "@stylexjs/stylex";
import { ErrorMessage, Field, Form, Formik } from "formik";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
// import TourTypes from "./tourType/TourTypes";
import TourPackageModal from "./TourPackageModal";
import { useTourPackages } from "../../context/tourPackage/TourPackageProvider";
import { useEffect, useState } from "react";

const styles = stylex.create({
  base: () => ({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  formContainer: () => ({
    width: "45rem",
    height: "35rem",
    borderRadius: "1rem",
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.2)",
  }),
  titleContainer: () => ({
    color: "aliceblue",
    fontSize: "1.5rem",
    height: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  inputsContainer: () => ({ height: "24rem" }),
  inputContainer: () => ({
    display: "flex",
    flexDirection: "column",
    height: "6rem",
    padding: "0 3rem 0 3rem",
  }),
  labelInputStyle: () => ({
    color: "aliceblue",
    fontSize: "1.3rem",
  }),
  fieldStyle: () => ({
    height: "2.8rem",
    borderRadius: "0.7rem",
    border: "none",
    paddingLeft: "1rem",
    fontFamily: "Poppins",
  }),
  selectStyle: () => ({
    width: "12rem",
    height: "2.8rem",
    borderRadius: "0.7rem",
    border: "none",
    fontFamily: "Poppins",
    // textAlign:"center  "
  }),
  buttonContainer: () => ({
    height: "7rem",
    padding: "1rem 3rem 2rem 3rem",
  }),
  buttonStyle: () => ({
    height: "100%",
    width: "100%",
    borderRadius: "0.7rem",
    background: {
      default: "rgb(0, 127, 255)",
    },
    color: "aliceblue",
    border: "none",
    fontFamily: "Poppins",
  }),
});

const MySwal = withReactContent(Swal);

function TourPackageForm() {
  const { createTourPackage, tourPackages } = useTourPackages();
  const navigate = useNavigate();
  const params = useParams();
  const [formValues, setFormValues] = useState(null);
  const initialValues = {
    name: "",
    destination: "",
    // tourTypes: [],
    // status: "",
    type: "national",
  };

  const loadTourPackage = () => {
    if (params.id) {
      const tourPackageFinded = tourPackages.find(
        (tourPackage) => tourPackage._id === params.id
      );
      if (tourPackageFinded) {
        setFormValues({
          name: tourPackageFinded.name || "",
          destination: tourPackageFinded.destination || "",
          type: tourPackageFinded.type || "",
        });
      } else {
        setFormValues(initialValues);
      }
    } else {
      setFormValues(initialValues);
    }
  };

  useEffect(() => {
    loadTourPackage();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    destination: Yup.string().required("Destination is required"),
    // tourTypes: Yup.array(),
    // status: Yup.string().required("Status is required"),
    type: Yup.string().required("Type is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    MySwal.fire({
      title: <p>Los siguientes datos seran registrados:</p>,
      html: <TourPackageModal values={values} />,
      showCancelButton: true,
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
            toast.onmouseover = Swal.stopTimer;
            toast.onmouseout = Swal.resumeTimer;
          },
        });
        try {
          const response = await createTourPackage(values);
          console.log("response::: ", response);
          if (response.success) {
            Toast.fire({
              icon: "success",
              title: "Registro exitoso",
            });
          }
        } catch (error) {
          console.error(error);
          Toast.fire({
            icon: "error",
            title: "Error al registrar",
          });
        } finally {
          setSubmitting(false);
          navigate("../");
        }
      },
    });
  };

  // const showTourTypes = () => {
  //   console.log("mostrar tour types::: ");
  //   MySwal.fire({
  //     title: "Tours",
  //     html: <TourTypes />,
  //     showCloseButton: true,
  //   });
  // };
  if (formValues === null) {
    return null;
  }
  return (
    <div {...stylex.props(styles.base())}>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form {...stylex.props(styles.formContainer())}>
            <div {...stylex.props(styles.titleContainer())}>
              <label htmlFor="title">
                {params.id
                  ? "Formulario de actualizacion"
                  : "Formulario de registro"}
              </label>
            </div>
            <div {...stylex.props(styles.inputsContainer())}>
              <div {...stylex.props(styles.inputContainer())}>
                <label
                  htmlFor="name"
                  {...stylex.props(styles.labelInputStyle())}
                >
                  Nombre del paquete:
                </label>
                <Field
                  type="text"
                  name="name"
                  {...stylex.props(styles.fieldStyle())}
                />
                <ErrorMessage name="name" component={"div"} />
              </div>
              <div {...stylex.props(styles.inputContainer())}>
                <label
                  htmlFor="destination"
                  {...stylex.props(styles.labelInputStyle())}
                >
                  Destino:
                </label>
                <Field
                  type="text"
                  name="destination"
                  {...stylex.props(styles.fieldStyle())}
                />
                <ErrorMessage name="destination" component={"div"} />
              </div>
              {/* <div>
                Tours:{" "}
                <button type="button" onClick={showTourTypes}>
                  Nuevo
                </button> 
              </div> */}
              {/* <div>
                <label htmlFor="status">estado</label>
                <Field as="select" name="status">
                  <option value={"unavailable"}>No disponible</option>
                  <option value="available">Disponible</option>
                </Field>
              </div> */}
              <div {...stylex.props(styles.inputContainer())}>
                <label
                  htmlFor="type"
                  {...stylex.props(styles.labelInputStyle())}
                >
                  Tipo de paquete
                </label>
                <Field
                  as="select"
                  name="type"
                  {...stylex.props(styles.selectStyle())}
                >
                  <option value={"national"}>Nacional</option>
                  <option value={"international"}>Internacional</option>
                </Field>
              </div>
            </div>
            <div {...stylex.props(styles.buttonContainer())}>
              <button
                type="submit"
                disabled={isSubmitting}
                {...stylex.props(styles.buttonStyle())}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default TourPackageForm;
