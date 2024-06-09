import * as stylex from "@stylexjs/stylex";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
// import { useSetQuestionsAnswers } from "../../context/setQuestionsAnswers/SetQuestionsAnswersProvider";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/auth";

const styles = stylex.create({
  base: () => ({
    height: "20rem",
    width: "40rem",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "1rem",
    boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }),
  informationLabelContainer: () => ({
    textAlign: "center",
    height: "33%",
    color: "aliceblue",
    fontSize: "1.5rem",
  }),
  labelFieldStyle: () => ({
    fontSize: "1.3rem",
    color: "aliceblue",
  }),
  fieldContainer: () => ({
    height: "33%",
    display: "flex",
    flexDirection: "column",
    padding: "0 1rem 0 1rem",
  }),
  fieldStyle: () => ({
    height: "2.4rem",
    borderRadius: "0.5rem",
    border: "none",
    fontFamily: "Poppins",
    paddingLeft: "1rem",
  }),
  buttonContainer: () => ({
    height: "2.4rem",
    padding: "0 1rem 0 1rem",
  }),
  buttonStyle: () => ({
    height: "100%",
    width: "100%",
    fontFamily: "Poppins",
    background: {
      default: "rgb(0, 127, 255)",
      ":hover": "rgb(0, 110, 255)",
    },
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    color: "aliceblue",
  }),
});

function QuestionForm() {
  const { decodeTokenRandomQuestionAnswer } = useAuth();
  const navigate = useNavigate();
  // const { randomQuestionAnswer } = useSetQuestionsAnswers();
  const initialValues = {
    answer: "",
  };
  const validationSchema = Yup.object().shape({
    answer: Yup.string().required("requerido"),
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // console.log("values::: ", values);
      const answer =
        decodeTokenRandomQuestionAnswer().questionAnswer.answerId.content;
      // console.log('answer::: ', answer);
      if (answer) {
        if (values.answer === answer) {
          // localStorage.removeItem("token");
          navigate("../restablecer-contraseña");
        } else {
          alert("Respuesta incorrecta");
        }
      }
    } catch (error) {
      console.error("Error al comparar las respuestas: ", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  const getQuestion = () => {
    return decodeTokenRandomQuestionAnswer().questionAnswer.questionId.content;
    // console.log('question::: ', question);
  };
  // if (!randomQuestionAnswer || !randomQuestionAnswer.questionAnswer) {
  //   return <p>Cargando pregunta...</p>;
  // }
  // useEffect(() => {
  //   if (randomQuestionAnswer===null) {
  //     navigate("/recuperar-contraseña")
  //   }
  // },[])

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form {...stylex.props(styles.base())}>
            <div {...stylex.props(styles.informationLabelContainer())}>
              <label htmlFor="information">
                Debes responder la pregunta de seguridad:
              </label>
            </div>
            <div {...stylex.props(styles.fieldContainer())}>
              <label
                htmlFor="question"
                {...stylex.props(styles.labelFieldStyle())}
              >
                {getQuestion()}
              </label>
              <Field
                type="text"
                name="answer"
                {...stylex.props(styles.fieldStyle())}
              />
              <ErrorMessage name="answer" component={"div"} />
            </div>
            <div {...stylex.props(styles.buttonContainer())}>
              <button
                type="submit"
                disabled={isSubmitting}
                {...stylex.props(styles.buttonStyle())}
              >
                {isSubmitting ? "Comprobando..." : "Enviar"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default QuestionForm;
