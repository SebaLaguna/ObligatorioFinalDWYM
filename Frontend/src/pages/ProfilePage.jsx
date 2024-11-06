import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProfilePage.css";
import Modal from "../components/Modal";
import { BASE_URL,PROFILE_URL,EDIT_PROFILE_URL,NAVIGATE_FEED } from "../Routes";


const ProfilePage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        BASE_URL+PROFILE_URL+`/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const updateUserProfile = async () => {
    try {
      const response = await fetch(
        BASE_URL+EDIT_PROFILE_URL,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            username: userData.user.username,
            profilePicture: userData.user.profilePicture,
          }),
        }
      );

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

  const handleEditClick = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  if (!userData) return <p>Cargando...</p>;

  return (
    <div className="profile-page">
      <div className="sidebar">
        <button
          className="sidebar-button"
          onClick={() => (window.location.href = NAVIGATE_FEED)}
        >
          <i className="fas fa-home"></i> Inicio
        </button>
        <button className="sidebar-button">
          <i className="fas fa-bell"></i> Notificaciones
        </button>
        <button className="sidebar-button">
          <i className="fas fa-plus-square"></i> Crear
        </button>
        <button className="sidebar-button" onClick={handleEditClick}>
          <i className="fas fa-edit"></i> Editar
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-header">
            <img
              src={userData.user.profilePicture}
              alt="Profile"
              className="profile-picture-large"
            />
            <h2 className="profile-username">{userData.user.username}</h2>
        </div>
        <div className="user-posts">
          {userData.posts.map((post) => (
            <div key={post._id} className="post-card">
              <img src={post.imageUrl} alt="Post" className="post-image" />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <h2>Editar Perfil</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateUserProfile();
            }}
          >
            <label>
              Nombre de usuario:
              <input
                type="text"
                value={userData.user.username}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    user: { ...userData.user, username: e.target.value },
                  })
                }
              />
            </label>
            <label>
              Foto de perfil (URL):
              <input
                type="text"
                value={userData.user.profilePicture}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    user: { ...userData.user, profilePicture: e.target.value },
                  })
                }
              />
            </label>
            <button type="submit">Guardar</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
