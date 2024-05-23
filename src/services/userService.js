import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function loginRequest(values) {
  try {
    const body = { email: values.email, password: values.password };
    console.log("body::: ", body);
    const result = await axios.post(`${apiUrl}/api/v1/login`, body);
    console.log("result::: ", result);
    if (result.data.token) {
      return { success: true, token: result.data.token };
    } else {
      return { success: false, message: "no se recibio tiken en la respuesta" };
    }
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "error de autenticacion",
      };
    } else {
      return {
        success: false,
        message: "error en la solicitud de inicio de sesion",
      };
    }
  }
}

async function getAllUsersRequest() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("no se encontro un token en el localstorage");
    }
    const response = await axios.get(`${apiUrl}/api/v1/users`);
    return response.data;
  } catch (error) {
    console.error(`ocurrio un error al obtener los users: ${error.message}`);
  }
}

async function logoutRequest(userId) {
  try {
    const body = { userId };
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.post(`${apiUrl}/api/v1/logout`, body);
    console.log("response::: ", response);
  } catch (error) {
    console.error("no se encontro un token en el localStorage");
    throw error;
  }
}

async function createUserRequest(body) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("No se encontro un token en el localStorage");
    }
    const response = await axios.post(`${apiUrl}/api/v1/register`, body);
    if (response.status === 201) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log("Error en la creacion del usuario: ", error.message);
  }
}
async function removeUserRequest(id) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("No se encontro un token en el almacenamiento local");
    }
    const response = await axios.delete(`${apiUrl}/api/v1/users/${id}`);
    if (response.status === 200) {
      return "Usuario eliminado correctamente";
    } else {
      throw new Error("No se pudo eliminar el usuario");
    }
  } catch (error) {
    console.log("Error al intentar borrar el usuario con id: ", id);
    throw error;
  }
}
async function updateUserRequest(id, body) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("No se encontro token en el local storage");
    }
    const response = await axios.patch(`${apiUrl}/api/v1/users/${id}`, body);
    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log("Error en la actualizacion de usuario: ", error.message);
  }
}

export {
  loginRequest,
  getAllUsersRequest,
  logoutRequest,
  createUserRequest,
  removeUserRequest,
  updateUserRequest,
};
