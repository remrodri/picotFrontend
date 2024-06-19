import * as Yup from "yup";
import { ItineraryForm, itinearyValidadtionSchema } from "./ItineraryForm";
import { ErrorMessage, Field, Form, Formik } from "formik";

const TourTypeForm = () => {
  const initialValues = {
    tourTypeName: "",
    itinerary: [{ time: "", activity: "" }],
  };

  const validationSchema = Yup.object().shape({
    tourTypeName: Yup.string().required("Nombre requerido"),
    itinerary: itinearyValidadtionSchema,
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("values::: ", values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <div>
            <label htmlFor="tourTypeName">Nombre del tipo de tour</label>
            <Field name="tourTypeName" type="text" />
            <ErrorMessage name="tourTypeName" component={"div"} />
          </div>
          <ItineraryForm values={values} />
          <button type="submit">Enviar</button>
        </Form>
      )}
    </Formik>
  );
};
export default TourTypeForm;
