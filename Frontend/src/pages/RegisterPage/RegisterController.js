export const registerUser = async (username, email, password, navigate) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
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
  