export const loginUser = async (email, password, setError, navigate) => {
    setError(null);
  
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el inicio de sesión");
      }
  
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data._id);
  
      navigate("/feed");
    } catch (error) {
      setError(error.message);
      console.error("Error al iniciar sesión", error);
    }
  };
  