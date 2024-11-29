import { BASE_URL,USER_URL,PROFILE_URL,EDIT_PROFILE_URL } from "../../routes";

export const fetchUserProfile = async (id, setUserData) => {
    try {
      const response = await fetch(BASE_URL+USER_URL+PROFILE_URL+id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Error al cargar el perfil", error);
    }
  };
  
  export const updateUserProfile = async (userData, setUserData, handleModalClose) => {
    try {
      const response = await fetch(BASE_URL+USER_URL+PROFILE_URL+EDIT_PROFILE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username: userData.user.username,
          profilePicture: userData.user.profilePicture,
        }),
      });
  
      if (response.ok) {
        const updatedData = await response.json();
        setUserData((prevData) => ({
          ...prevData,
          user: updatedData.user,
        }));
        handleModalClose();
      } else {
        console.error("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización", error);
    }
  };
  