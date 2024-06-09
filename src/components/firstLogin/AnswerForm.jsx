import { useEffect } from "react";
import * as stylex from "@stylexjs/stylex";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSetQuestionsAnswers } from "../../context/setQuestionsAnswers/SetQuestionsAnswersProvider";

const styles = stylex.create({
  base: () => ({
    width: "100%",
    height: "100%",
    // fontSize: "1.3rem",
    display: "flex",
    flexDirection: "column",
  }),
  informationLabelStyle: () => ({
    fontSize: "1.3rem",
    padding: "0 1rem 0 1rem",
  }),
  formContainer: () => ({
    padding: "1rem 4rem 0 4rem",
    flexGrow: 1,
    gap: "0.5rem",
  }),
  fieldContainer: () => ({
    height: "5.8rem",
    display: "flex",
    flexDirection: "column",
  }),
  fieldStyle: () => ({
    height: "2.1rem",
    border: "none",
    borderRadius: "0.5rem",
    paddingLeft: "1rem",
  }),
  labelStyle: () => ({
    fontSize: "1.2rem",
  }),
  buttonContainer: () => ({
    height: "2.5rem",
  }),
  buttonStyle: () => ({
    height: "100%",
    borderRadius: "0.5rem",
    border: "none",
    fontFamily: "Poppins",
    width: "100%",
    cursor: "pointer",
    backgroundColor: {
      default: "rgb(0, 127, 255)",
      ":hover": "rgb(0, 110, 255)",
    },
    color: "aliceblue",
  }),
});

function AnswerForm() {
  const { questionsAnswers, updateSetQuestionsAnswers } =
    useSetQuestionsAnswers();

  const navigate = useNavigate();
  const initialValues = {
    answer1: "",
    answer2: "",
    answer3: "",
  };

  const validationSchema = Yup.object({
    answer1: Yup.string().required("Required"),
    answer2: Yup.string().required("Required"),
    answer3: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // console.log("values::: ", values);
      const response = await updateSetQuestionsAnswers(values);
      console.log('response::: ', response);
      if (response.success) {
        const role = localStorage.getItem("role");
        switch (role) {
          case "administrador":
            navigate("/administrador");
            break
          case "operador":
            navigate("/operador");
            break
          case "guia":
            navigate("/guia");
            break
          default:
            alert("No se puede redireccionar");
            break;
        }
      } else {
        alert("no se pudo guardar las respuestas")
      }
    } catch (error) {
      console.error("Error en el registro de setQuestionAnswer");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {}, []);

  if (questionsAnswers.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div {...stylex.props(styles.base())}>
      <label htmlFor="title" {...stylex.props(styles.informationLabelStyle())}>
        Debes responder las siguientes 3 preguntas de seguridad para recuperar
        tu contrasena en caso de olvidarlo:
      </label>
      <div {...stylex.props(styles.formContainer())}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div {...stylex.props(styles.fieldContainer())}>
                <label
                  htmlFor="question1"
                  {...stylex.props(styles.labelStyle())}
                >
                  {questionsAnswers[0].questionId.content}
                </label>
                <Field
                  type="text"
                  name="answer1"
                  {...stylex.props(styles.fieldStyle())}
                />
                <ErrorMessage name="answer1" component={"div"} />
              </div>
              <div {...stylex.props(styles.fieldContainer())}>
                <label
                  htmlFor="question2"
                  {...stylex.props(styles.labelStyle())}
                >
                  {questionsAnswers[1].questionId.content}
                </label>
                <Field
                  type="text"
                  name="answer2"
                  {...stylex.props(styles.fieldStyle())}
                />
                <ErrorMessage name="answer2" component={"div"} />
              </div>
              <div {...stylex.props(styles.fieldContainer())}>
                <label
                  htmlFor="question3"
                  {...stylex.props(styles.labelStyle())}
                >
                  {questionsAnswers[2].questionId.content}
                </label>
                <Field
                  type="text"
                  name="answer3"
                  {...stylex.props(styles.fieldStyle())}
                />
                <ErrorMessage name="answer3" component={"div"} />
              </div>
              <div {...stylex.props(styles.buttonContainer())}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  {...stylex.props(styles.buttonStyle())}
                >
                  {isSubmitting ? "Registrando..." : "Finalizar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default AnswerForm;
