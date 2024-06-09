import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import * as stylex from "@stylexjs/stylex";
import { useNavigate } from "react-router-dom";
import { useSetQuestionsAnswers } from "../../context/setQuestionsAnswers/SetQuestionsAnswersProvider";

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
  informationlabelContainer: () => ({
    height: "33%",
  }),
  informationLabel: () => ({
    color: "aliceblue",
    fontSize: "1.5rem",
  }),
  labelStyle: () => ({
    fontSize: "1.3rem",
    color: "aliceblue",
  }),
  fieldContainer: () => ({
    height: "33%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  }),
  fieldStyle: () => ({
    height: "2.4rem",
    borderRadius: "0.5rem",
    border: "none",
    fontFamily: "Poppins",
    paddingLeft: "1rem",
  }),
  buttonContainer: () => ({
    height: "17%",
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

function EmailForm() {
  const navigate = useNavigate();
  const { getRandomQuestionAnswerByEmail } = useSetQuestionsAnswers();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("correo invalido").required("requerido"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // const response = await getQuestionAnswerByEmailRequest(values);
      const response = await getRandomQuestionAnswerByEmail(values);
      // console.log("response::: ", response);
      if (response.success) {
        navigate("pregunta");
      } else {
        alert(
          "No se puede restablecer la contraseña del correo electronico proporcionado"
        );
      }
    } catch (error) {
      console.error("Error al enviar el email: ", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form {...stylex.props(styles.base())}>
            <div {...stylex.props(styles.informationlabelContainer())}>
              <label
                htmlFor="information"
                {...stylex.props(styles.informationLabel())}
              >
                Para restablecer tu password debes ingresar tu correo
                electronico
              </label>
            </div>
            <div {...stylex.props(styles.fieldContainer())}>
              <label {...stylex.props(styles.labelStyle())} htmlFor="email">
                Escribe tu correo electronico
              </label>
              <Field
                type="email"
                name="email"
                {...stylex.props(styles.fieldStyle())}
              />
              <ErrorMessage name="email" component={"div"} />
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
export default EmailForm;
