import * as stylex from "@stylexjs/stylex";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useTourPackages } from "../../../context/tourPackage/TourPackageProvider";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import DayForm from "./DayForm";
import { createTourTypeRequest } from "../../../services/tourTypeService";
import AvailableDatesForm from "./AvailableDatesForm";


const styles = stylex.create({
  base: () => ({
    height: "100%",
  }),
});

function NewTourTypeForm() {
  const params = useParams();
  const { tourPackages } = useTourPackages();
  const [tourPackage, setTourPackage] = useState({});

  const initialValues = {
    name: "",
    price: "",
    meals: { breakfast: false, lunch: false, dinner: false },
    attractions: [],
    available: false,
    availableDates: [],
    // itinerary: [{ activities: [{ hour: "", activity: "" }] }],
    itinerary: [{ activities: [{ hour: "", activity: "" }] }],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().min(0).required("Price is required"),
    meals: Yup.object().shape({
      breakfast: Yup.boolean(),
      lunch: Yup.boolean(),
      dinner: Yup.boolean(),
    }),
    attractions: Yup.array()
      .of(Yup.string())
      .required("Attractions is required"),
    available: Yup.boolean(),
    availableDates: Yup.array()
      .of(Yup.string())
      .required("Available dates is required"),
    itinerary: Yup.array().of(
      Yup.object().shape({
        activities: Yup.array().of(
          Yup.object().shape({
            hour: Yup.string().required("Hora es requerida"),
            activity: Yup.string().required("Actividad es requerida"),
          })
        ),
      })
    ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("values::: ", values);
      const newValues = { ...values, tourPackageId: params.id };
      const response = await createTourTypeRequest(newValues);
      console.log("response::: ", response);
    } catch (error) {
      console.log("error::: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  const loadTourPackage = () => {
    if (params.id) {
      const tourPackageFinded =
        tourPackages.find((tourPackage) => tourPackage._id === params.id) || {};
      console.log("tourPackageFinded::: ", tourPackageFinded);
      setTourPackage(tourPackageFinded);
    }
  };

  useEffect(() => {
    loadTourPackage();
  }, [tourPackages]);

  return (
    <div {...stylex.props(styles.base())}>
      <div>
        <label htmlFor="title">
          {tourPackage.tourTypes &&
          Array.isArray(tourPackage.tourTypes) &&
          tourPackage.tourTypes.length > 0
            ? "Actualizar"
            : "Nuevo "}
          tour
        </label>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div>
              <label htmlFor="name">Nombre</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component={"div"} />
            </div>
            <div>
              <label htmlFor="price">Precio</label>
              <Field type="number" name="price" />
              <ErrorMessage name="price" component={"div"} />
            </div>
            <div>
              <label htmlFor="breakfast">Desayuno</label>
              <Field type="checkbox" name="meals.breakfast" />
              <label htmlFor="lunch">Almuerzo</label>
              <Field type="checkbox" name="meals.lunch" />
              <label htmlFor="dinner">Cena</label>
              <Field type="checkbox" name="meals.dinner" />
            </div>
            <div>
              <FieldArray
                name="itinerary"
                render={(arrayHelpers) => (
                  <div>
                    {values.itinerary.map((day, index) => (
                      <div key={index}>
                        <DayForm dayIndex={index} values={values} />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Eliminar día
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          activities: [{ hour: "", activity: "" }],
                        })
                      }
                    >
                      Agregar día
                    </button>
                  </div>
                )}
              />
            </div>
            <AvailableDatesForm/>
            <div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
            
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NewTourTypeForm;
