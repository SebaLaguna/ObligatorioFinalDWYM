import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FeedPage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Publicacion from "./Publicacion";
import Modal from "../components/Modal"

const timeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: "año", seconds: 31536000 },
    { label: "mes", seconds: 2592000 },
    { label: "día", seconds: 86400 },
    { label: "hora", seconds: 3600 },
    { label: "minuto", seconds: 60 },
    { label: "segundo", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} atrás`;
    }
  }
  return "Justo ahora";
};

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [userProfile, setUserProfile] = useState(null); // Para almacenar los datos del usuario logueado
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/posts/feed", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al cargar el feed");
      }

      const data = await response.json();
      const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error al cargar el feed", error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al cargar el perfil del usuario");
      }

      const userData = await response.json();
      setUserProfile(userData);
    } catch (error) {
      console.error("Error al cargar el perfil del usuario", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUserProfile(); // Obtener los datos del usuario logueado
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
    document.body.style.overflow = "hidden"; 
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
    document.body.style.overflow = "auto"; 
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleProfileClick = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <div className="feed-container">
      <div className="sidebar">
        <button className="sidebar-button">
          <i className="fas fa-home"></i> Inicio
        </button>
        <button className="sidebar-button">
          <i className="fas fa-bell"></i> Notificaciones
        </button>
        <button className="sidebar-button">
          <i className="fas fa-plus-square"></i> Crear
        </button>
        <button className="sidebar-button" onClick={handleProfileClick}>
          {userProfile?.user.profilePicture ? (
            <img
              src={userProfile.user.profilePicture}
              alt="Profile"
              className="sidebar-profile-picture"
            />
          ) : (
            <i className="fas fa-user"></i>
          )}
          Perfil
        </button>
      </div>
      <div className="feed">
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <div className="post-header">
              <img
                src={post.user.profilePicture || "/default-profile.png"}
                alt="Profile"
                className="profile-picture"
              />
              <div className="post-info">
                <span className="username">{post.user.username}</span>
                <span className="post-time">{timeSince(post.createdAt)}</span>
              </div>
            </div>
            <div className="post-image-container">
              <img
                src={post.imageUrl || "/default-post.png"}
                alt="Post"
                className="post-image"
                onClick={() => openModal(post)}
              />
            </div>
            <div className="post-caption">
              <p>{post.caption}</p>
            </div>
            <div className="post-likes">
              <p>{post.likes.length} likes</p>
            </div>
          </div>
        ))}
      </div>
     {showModal && selectedPost && (
      <Modal children={<Publicacion selectedPost={selectedPost} />} onClose={closeModal} />)}

    </div>
    </div>
  );
};

export default FeedPage;

