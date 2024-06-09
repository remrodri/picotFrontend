import { useContext, useState } from "react";
import { QuestionContext } from "./QuestionContext";
import { getRandomQuestionsRequest } from "../../services/questionService";

// eslint-disable-next-line react-refresh/only-export-components
export const useQuestions = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error("useQuestions debe ser usado con QuestionProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const QuestionsContextProvider = ({ children }) => {
  const [randomQuestions, setRandomQuestions] = useState([]);

  const loadRandomQuestions = async () => {
    try {
      const response = await getRandomQuestionsRequest();
      console.log("response::: ", response);
      setRandomQuestions(response.questions);
    } catch (error) {
      console.error("Error al obtener las questions", error);
    }
  };
  return (
    <QuestionContext.Provider value={{ randomQuestions, loadRandomQuestions }}>
      {children}
    </QuestionContext.Provider>
  );
};
