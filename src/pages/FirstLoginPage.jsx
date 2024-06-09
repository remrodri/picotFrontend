import * as stylex from "@stylexjs/stylex";
import firstLoginBackground from "../assets/images/firstLoginBackground.jpg";
import { Outlet } from "react-router-dom";
// import { useQuestions } from "../context/question/QuestionProvider";
import { useEffect } from "react";
import { useSetQuestionsAnswers } from "../context/setQuestionsAnswers/SetQuestionsAnswersProvider";
// import { getSetQuestionsAnswersById } from "../services/setQuestionsAnswersService";
// import useAuth from "../hooks/auth";

const styles = stylex.create({
  base: () => ({
    backgroundImage: `url(${firstLoginBackground})`,
    height: "100dvh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  mainContainer: () => ({
    height: "40rem",
    width: "50rem",
    background: "rgba(18, 18, 18, 0.2)",
    borderRadius: "1rem",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    border: "1px solid rgba(18, 18, 18, 0.3)",
    display: "flex",
    flexDirection: "column",
  }),
  topContainer: () => ({
    height: "7rem",
  }),
  titleContainer: () => ({
    height: "7rem",
    alignContent: "center",
    textAlign: "center",
    fontSize: "2rem",
  }),
  paragraphContainer: () => ({
    height: "6rem",
    textAlign: "center",
    alignContent: "center",
    fontSize: "1.3rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  }),
  botContainer: () => ({
    flexGrow: 1,
  }),
});

function FirstLoginPage() {
  const { loadQuestionsAnswers } = useSetQuestionsAnswers();

  useEffect(() => {
    loadQuestionsAnswers();
    // loadRandomQuestions();
    // setQuestionsAnswers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.mainContainer())}>
        <div {...stylex.props(styles.titleContainer())}>
          <label htmlFor="">Saludos:</label>
        </div>
        <div {...stylex.props(styles.paragraphContainer())}>
          <p>
            Al ser la primera vez que inicias sesion debes completar algunos
            pasos antes de acceder al sistema
          </p>
        </div>

        <div {...stylex.props(styles.botContainer())}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default FirstLoginPage;
