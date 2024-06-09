import { useContext, useState } from "react";
import { SetQuesionsAnswerContext } from "./SetQuestionsAnswersContext";
import {
  getQuestionAnswerByEmailRequest,
  getSetQuestionsAnswersByIdRequest,
  updateAnswersRequest,
} from "../../services/setQuestionsAnswersService";
import useAuth from "../../hooks/auth";

// eslint-disable-next-line react-refresh/only-export-components
export const useSetQuestionsAnswers = () => {
  const context = useContext(SetQuesionsAnswerContext);
  if (!context) {
    throw new Error(
      "useSetQuestionsAnswers debe ser usado con SetQuestionsAnswersProvider"
    );
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const SetQuestionsAnswersContextProvider = ({ children }) => {
  const { decodeTokenUserId } = useAuth();
  const [questionsAnswers, setQuestionsAnswers] = useState([]);
  // const [randomQuestionAnswer, setRandomQuestionAnswer] = useState(null);
  const [set, setSet] = useState("");

  const loadQuestionsAnswers = async () => {
    try {
      const userId = decodeTokenUserId();
      const response = await getSetQuestionsAnswersByIdRequest(userId);
      // console.log("response::: ", response);
      if (response.success) {
        setQuestionsAnswers(response.set.questionsAnswers);
        setSet(response.set);
      }
    } catch (error) {
      console.error("Error al obtener el setQuestionAnswers", error);
    }
  };
  const updateSetQuestionsAnswers = async (answers) => {
    try {
      const setId = set._id;
      // console.log("setId::: ", setId);
      // console.log("answers::: ", answers);
      const body = {
        answers: [
          {
            questionId: questionsAnswers[0].questionId._id,
            content: answers.answer1,
          },
          {
            questionId: questionsAnswers[1].questionId._id,
            content: answers.answer2,
          },
          {
            questionId: questionsAnswers[2].questionId._id,
            content: answers.answer3,
          },
        ],
      };
      // console.log('body::: ', body);
      const response = await updateAnswersRequest(setId, body);
      // console.log('response::: ', response);
      return response;
    } catch (error) {
      console.error("Error al actualizar las respuestas");
    }
  };
  const getRandomQuestionAnswerByEmail = async (email) => {
    try {
      // console.log("email::: ", email);
      const response = await getQuestionAnswerByEmailRequest(email);
      // console.log('response::: ', response);
      if (response.success) {
        // console.log('response.token::: ', response.token);
        localStorage.setItem("token", response.token);
        // setRandomQuestionAnswer(response.data);
        // const res = decodeTokenRandomQuestionAnswer();
        // console.log("res::: ", res);
        // if (res) {
        //   return { success: true,};
        // } else {
        //   return { success: false };
        // }
      }
      // return response.success
      return { success: response.success };
    } catch (error) {
      console.error("Error al obtener una randomQuestionAnswer");
    }
  };

  return (
    <SetQuesionsAnswerContext.Provider
      value={{
        questionsAnswers,
        loadQuestionsAnswers,
        updateSetQuestionsAnswers,
        getRandomQuestionAnswerByEmail,
        // randomQuestionAnswer,
      }}
    >
      {children}
    </SetQuesionsAnswerContext.Provider>
  );
};
