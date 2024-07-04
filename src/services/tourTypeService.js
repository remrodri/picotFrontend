import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const getAllTourTypesByTourPackageIdRequest = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(`${apiUrl}/api/v1/tour-types/${id}`);
      if (response.status === 200) {
        return { success: true, tourTypes: response.data };
      }
    } else {
      console.error("no se encontro el token en el localStorage");
    }
  } catch (error) {
    console.error("Error al recuperar los tourTypes: ", error.message);
    return {
      success: false,
    };
  }
};

const createTourTypeRequest = async (body) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("no se encontro el token en el localStorage");
    }
    const response = await axios.post(`${apiUrl}/api/v1/tour-types`, body);
    if (response.status === 201) {
      return { success: true, tourType: response.data };
    }
  } catch (error) {
    console.error("Error al crear el tourType: ", error.message);
    return { success: false };
  }
};

// const addNewTourType = async (tourPackageId,body) => {
//   try {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       const response = await axios.post(`${apiUrl}/api/v1/type-tours/${tourPackageId}`)
//     }
//   } catch (error) {}
// };

export { getAllTourTypesByTourPackageIdRequest,createTourTypeRequest };
