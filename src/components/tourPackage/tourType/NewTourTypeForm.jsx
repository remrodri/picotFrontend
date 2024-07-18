import * as stylex from "@stylexjs/stylex";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useTourPackages } from "../../../context/tourPackage/TourPackageProvider";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import DayForm from "./DayForm";
import {
  createTourTypeRequest,
  updateTourTypeRequest,
} from "../../../services/tourTypeService";
import AvailableDatesForm from "./AvailableDatesForm";
import AtractionsForm from "./AtractionsForm";
import { useTourTypes } from "../../../context/tourPackage/tourType/TourTypeProvider";

const styles = stylex.create({
  base: () => ({
    height: "100%",

    padding: "1rem",
  }),
  titleContainer: () => ({
    height: "3rem",
    display: "flex",
    color: "aliceblue",
    justifyContent: "center",
    fontSize: "1.5rem",
  }),
  formContainer: () => ({
    display: "flex",
    flexWrap: "wrap",
    // flexDirection:"column",
    gap: "1rem ",
    justifyContent: "center",
  }),
  inputLabelStyle: () => ({
    color: "aliceblue",
    fontSize: "1.3rem",
  }),
  fieldContainer: () => ({
    height: "6rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "baseline",
    // gap:"0.5rem"
  }),
  fieldTextStyle: () => ({
    height: "2.5rem",
    fontSize: "1.3rem",
    borderRadius: "0.5rem",
    border: "none",
    fontFamily: "Poppins",
    paddingLeft: "1rem",
  }),
  basicInfoContainer: () => ({
    height: "32.6rem",
    width: "30rem",
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "1rem 0 0 1rem",
    padding: "1rem",
  }),
  mealsContainer: () => ({
    width: "9rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  }),
  checkboxContainer: () => ({
    display: "flex",
    justifyContent: "space-between",
  }),
  checkboxStyle: () => ({
    width: "1.8rem",
  }),
  itineraryContainer: () => ({
    width: "100.8rem",
    padding: "1rem",
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "1rem",
  }),
  daysContainer: () => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  }),
  dayContainer: () => ({
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "0.5rem",
    padding: "1rem",
  }),
  deleteDayButtonContainer: () => ({
    // height: "2.5rem",
    display: "flex",
    justifyContent: "flex-end",
  }),
  deleteDayButtonStyle: () => ({
    height: "2.5rem",
    border: "none",
    fontFamily: "Poppins",
    width: "14.5rem",
    borderRadius: "0.4rem",
  }),
  addDayButtonStyle: () => ({
    height: "2.5rem",
    border: "none",
    fontFamily: "Poppins",
    borderRadius: "0.4rem",
    cursor: "pointer",
  }),
});

function NewTourTypeForm() {
  const navigate = useNavigate();
  const params = useParams();
  console.log("params::: ", params);
  const { tourPackages } = useTourPackages();
  const { tourPackageTourTypes,createTourType, updateTourType } = useTourTypes();
  // const [tourPackage, setTourPackage] = useState({});
  const [tourType, setTourType] = useState({});
  // const [formatedDats, setFormatedDates] = useState([]);

  // const formatAvailableDates = () => {
  //   console.log("availableDates::: ", tourType.availableDates);
  //   if (tourType.availableDates) {
  //     const formattedAvailableDates = tourType.availableDates.map(
  //       (date) => new Date(date)
  //     );
  //     setFormatedDates(formattedAvailableDates);
  //   } else {
  //     setFormatedDates([]);
  //   }

  //   // console.log("formattedAvailableDates::: ", formattedAvailableDates);

  //   // if (availableDates.length > 0) {
  //   //   return availableDates.map((availableDate) => new Date(availableDate));
  //   // }
  //   // return [];
  // };

  const initialValues = {
    name: tourType.name || "",
    price: tourType.price || "",
    meals: tourType.meals || { breakfast: false, lunch: false, dinner: false },
    attractions: tourType.attractions || [],
    available: tourType.available || false,
    availableDates: tourType.availableDates || [],
    // itinerary: [{ activities: [{ hour: "", activity: "" }] }],
    itinerary: tourType.itinerary || [
      { activities: [{ hour: "", activity: "" }] },
    ],
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

      const response = params.tourTypeId
        // ? await updateTourTypeRequest(params.tourTypeId, newValues)
        ? await updateTourType(params.tourTypeId, newValues)
        // : await createTourTypeRequest(newValues);
        : await createTourType(newValues);
      console.log("response::: ", response);
      if (response.success) {
        console.log("tourPackages::: ", tourPackages);
      }
    } catch (error) {
      console.log("error::: ", error);
    } finally {
      setSubmitting(false);
      navigate("../");
    }
  };

  const loadTourtype = () => {
    if (params.id && tourPackages) {
      const tourPackageFinded =
        tourPackages.find((tourPackage) => tourPackage._id === params.id) || {};
      // console.log("tourPackageFinded::: ", tourPackageFinded);
      // setTourPackage(tourPackageFinded);
      if (tourPackageFinded.tourTypes) {
        const tourTypeFinded =
          tourPackageFinded.tourTypes.find(
            (tourType) => tourType._id === params.tourTypeId
          ) || {};
        console.log("tourTypeFinded::: ", tourTypeFinded);
        setTourType(tourTypeFinded);
      }
    }
  };
  const loadTourtype2 = () => {
    if (params.id && tourPackages) {
      const tourPackageFinded =
        tourPackages.find((tourPackage) => tourPackage._id === params.id) || {};
      // console.log("tourPackageFinded::: ", tourPackageFinded);
      // setTourPackage(tourPackageFinded);
      if (tourPackageFinded.tourTypes) {
        const tourTypeFinded =
          tourPackageFinded.tourTypes.find(
            (tourType) => tourType._id === params.tourTypeId
          ) || {};
        console.log("tourTypeFinded::: ", tourTypeFinded);
        setTourType(tourTypeFinded);
      }
    }
  };

  useEffect(() => {
    loadTourtype();
  }, [tourPackages,tourPackageTourTypes]);

  const convertToDates = (dateStrings) => {
    return dateStrings.map((dateString) => new Date(dateString));
  };

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.titleContainer())}>
        <label htmlFor="title">
          {params.tourTypeId ? "Actualizar " : "Nuevo "}
          tipo de tour
        </label>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div {...stylex.props(styles.formContainer())}>
              <div {...stylex.props(styles.basicInfoContainer())}>
                <div {...stylex.props(styles.titleContainer())}>
                  <label htmlFor="title">Informacion General</label>
                </div>
                <div {...stylex.props(styles.fieldContainer())}>
                  <label
                    htmlFor="name"
                    {...stylex.props(styles.inputLabelStyle())}
                  >
                    Nombre:
                  </label>
                  <Field
                    type="text"
                    name="name"
                    {...stylex.props(styles.fieldTextStyle())}
                  />
                  <ErrorMessage name="name" component={"div"} />
                </div>
                <div {...stylex.props(styles.fieldContainer())}>
                  <label
                    htmlFor="price"
                    {...stylex.props(styles.inputLabelStyle())}
                  >
                    Precio:
                  </label>
                  <Field
                    type="number"
                    name="price"
                    {...stylex.props(styles.fieldTextStyle())}
                  />
                  <ErrorMessage name="price" component={"div"} />
                </div>
                <div {...stylex.props(styles.mealsContainer())}>
                  <div {...stylex.props(styles.checkboxContainer())}>
                    <label
                      htmlFor="breakfast"
                      {...stylex.props(styles.inputLabelStyle())}
                    >
                      Desayuno:
                    </label>
                    <Field
                      type="checkbox"
                      name="meals.breakfast"
                      {...stylex.props(styles.checkboxStyle())}
                    />
                  </div>
                  <div {...stylex.props(styles.checkboxContainer())}>
                    <label
                      htmlFor="lunch"
                      {...stylex.props(styles.inputLabelStyle())}
                    >
                      Almuerzo:
                    </label>
                    <Field
                      type="checkbox"
                      name="meals.lunch"
                      {...stylex.props(styles.checkboxStyle())}
                    />
                  </div>
                  <div {...stylex.props(styles.checkboxContainer())}>
                    <label
                      htmlFor="dinner"
                      {...stylex.props(styles.inputLabelStyle())}
                    >
                      Cena:
                    </label>
                    <Field
                      type="checkbox"
                      name="meals.dinner"
                      {...stylex.props(styles.checkboxStyle())}
                    />
                  </div>
                </div>
              </div>
              <AtractionsForm values={values} setFieldValue={setFieldValue} />
              <AvailableDatesForm
                availableDates={convertToDates(values.availableDates)}
                setFieldValue={setFieldValue}
              />
              <div {...stylex.props(styles.itineraryContainer())}>
                <div>
                  <label
                    htmlFor="title"
                    {...stylex.props(styles.titleContainer())}
                  >
                    Llena el itinerario para este tour
                  </label>
                </div>

                <FieldArray
                  name="itinerary"
                  render={(arrayHelpers) => (
                    <div {...stylex.props(styles.daysContainer())}>
                      {values.itinerary.map((day, index) => (
                        <div
                          key={index}
                          {...stylex.props(styles.dayContainer())}
                        >
                          <DayForm dayIndex={index} values={values} />
                          <div
                            {...stylex.props(styles.deleteDayButtonContainer())}
                          >
                            <button
                              {...stylex.props(styles.deleteDayButtonStyle())}
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              Eliminar día
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        {...stylex.props(styles.addDayButtonStyle())}
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
  );
}

export default NewTourTypeForm;
