import * as stylex from "@stylexjs/stylex";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import BasicInfoForm from "./BasicInfoForm";
import AccommodationForm from "./AccommodationForm";
import { Form, Formik } from "formik";
import MealsAndDiningForm from "./MealsAndDiningForm";

const styles = stylex.create({
  base: () => ({
    height: "100%",
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
    width: "100%",
    flexGrow: 1,
    display: "flex",
    // gap: "1rem",
    padding: "1rem 1rem 0 1rem",
    // paddingLeft:"1rem"
  }),
  formContainer: () => ({
    display: "flex",
    gap: "1rem",
    flexWrap:"wrap"
  }),
});

function TourPackageForm() {
  const params = useParams();
  const initialValues = {
    packageName: "",
    destination: "",
    duration: 1,
    accommodationType: "",
    services: "",
  };

  const validationSchema = Yup.object().shape({
    packageName: Yup.string().required("campo requerido"),
    destination: Yup.string().required("campo requerido"),
    duration: Yup.number()
      .min(1)
      .positive()
      .integer()
      .required("campo requerido"),
    accommodationType: Yup.string().required("campo requerido"),
    services: Yup.string().required("campo requerido"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("values::: ", values);
    setSubmitting(false);
  };

  return (
    <div {...stylex.props(styles.base())}>
      <div>
        <div {...stylex.props(styles.mainLabelContainer())}>
          <label htmlFor="title">
            {params.id
              ? "Formulario de actualizacion de paquete turistico"
              : "Formaulario de registro de paquete turistico"}
          </label>
        </div>
      </div>
      <div {...stylex.props(styles.mainContainer())}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          // enableReinitialize={true}
        >
          {({ isSubmitting }) => (
            <Form>
              <div {...stylex.props(styles.formContainer())}>
                <BasicInfoForm />
                <AccommodationForm />
                <MealsAndDiningForm/>
              </div>
              <div>
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
export default TourPackageForm;
