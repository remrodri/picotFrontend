import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function loginRequest(values) {
  try {
    const body = { email: values.email, password: values.password };
    console.log("body::: ", body);
    const result = (await axios.post(`${apiUrl}/api/v1/login`, body));
    console.log("result::: ", result);
    if (result.data.token) {
      return {success:true,token:result.data.token};
    } else {
      return {success:false,message:"no se recibio tiken en la respuesta"}
    }
  } catch (error) {
    if (error.response) {
      return{success:false,message:error.response.data.message||"error de autenticacion"}
    } else {
      return{success:false,message:"error en la solicitud de inicio de sesion"}
    }
  }
}

export { loginRequest };
