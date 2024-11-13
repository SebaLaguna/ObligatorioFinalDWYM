import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ProfilePage.css";
import Modal from "../../components/Modal/Modal";
import Publicacion from "../../components/Publicacion/Publicacion";
import { fetchUserProfile, updateUserProfile } from "./ProfileController"; 
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button"; 

const ProfilePage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchUserProfile(id, setUserData);
  }, [id]);

  const handleEditClick = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };

  const handlePostModalClose = () => {
    setIsPostModalOpen(false);
    setSelectedPost(null);
  };

  if (!userData) return <p>Cargando...</p>;

  return (
    <div className="profile-page">
      <div className="sidebar">
        <Button className="sidebar-button" onClick={() => (window.location.href = "/feed")}>
          <i className="fas fa-home"></i> Inicio
        </Button>
        <Button className="sidebar-button">
          <i className="fas fa-bell"></i> Notificaciones
        </Button>
        <Button className="sidebar-button">
          <i className="fas fa-plus-square"></i> Crear
        </Button>
        <Button className="sidebar-button" onClick={handleEditClick}>
          <i className="fas fa-edit"></i> Editar
        </Button>
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
            <div key={post._id} className="post-card" onClick={() => handlePostClick(post)}>
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
              updateUserProfile(userData, setUserData, handleModalClose); 
            }}
          >
            <label>
              Nombre de usuario:
              <Input
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
              <Input
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
            <Button type="submit">Guardar</Button>
          </form>
        </Modal>
      )}

      {isPostModalOpen && selectedPost && (
        <Modal onClose={handlePostModalClose}>
          <Publicacion selectedPost={selectedPost} />
          <Button onClick={() => console.log("Abrir modal de edición")}>Editar publicación</Button>
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
