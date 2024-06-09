import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function getRandomQuestionsRequest() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("No se encontro un token en el localStorage");
    }
    const response = await axios.get(`${apiUrl}/api/v1/random-questions`);
    if (response.status === 200) {
      return { success: true, questions: response.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Ocurrio un error al obtener los users: ", error.message);
  }
}

export { getRandomQuestionsRequest };
