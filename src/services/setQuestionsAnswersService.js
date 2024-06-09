import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function getSetQuestionsAnswersByIdRequest(userId) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("No se encontro token en localStorage");
    }
    const response = await axios.get(
      `${apiUrl}/api/v1/set-question-answer/${userId}`
    );
    if (response.status === 200) {
      // console.log('response::: ', response.data);
      return {
        success: true,
        // questionsAnswers: response.data.questionsAnswers,
        // setId: response.data._id,
        set: response.data,
      };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error al recuperar setQuestionsAnswers: ", error.message);
  }
}

async function updateAnswersRequest(setId, body) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("No se encontro token en el localStorage");
    }
    const response = await axios.patch(
      `${apiUrl}/api/v1/set-question-answer/${setId}`,
      body
    );
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error al actualizar setQuestionsAnswers: ", error.message);
    return { success: false };
  }
}

async function getQuestionAnswerByEmailRequest(email) {
  // console.log("email::: ", email);
  try {
    const response = await axios.post(
      `${apiUrl}/api/v1/random-question-answer`,
      email
    );
    if (response.status === 200 && response.data.token) {
      // console.log('response.data::: ', response.data);
      return { success: true, token: response.data.token };
    }
  } catch (error) {
    console.error(
      "Error al obtener el questionAnswer aleatorio: ",
      error.message
    );
    return { success: false };
  }
}

export {
  getSetQuestionsAnswersByIdRequest,
  updateAnswersRequest,
  getQuestionAnswerByEmailRequest,
};
