import { BASE_URL,AUTH_URL,REGISTER_URL } from "../../routes";

export const registerUser = async (username, email, password, navigate) => {
    try {
      const response = await fetch(BASE_URL+AUTH_URL+REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Error al registrar");
      }

      navigate("/");
    } catch (error) {
      console.error("Error al registrar", error);
      throw new Error(error.message || "Error al registrar");
    }
  };
  