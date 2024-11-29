import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Publicacion from "../../components/Publicacion/Publicacion";
import Modal from "../../components/Modal/Modal";
import { fetchPosts, fetchUserProfile, handleCommentSubmit, handleCommentChange } from "./FeedController";
import Button from "../../components/Button/Button";  
import Input from "../../components/Input/Input";  
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../styles/FeedPage.css";
import { darLike,quitarLike } from "../../components/Like/Like";

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
  const [userProfile, setUserProfile] = useState(null);
  const [comments, setComments] = useState({}); 
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchPosts(setPosts);
    fetchUserProfile(userId, setUserProfile);
  }, [userId]);

  useEffect(() => {
    if (selectedPost) {
      setShowModal(true);
    }
  }, [selectedPost]);

  const openModal = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
    document.body.style.overflow = "auto";
  };

  const handleProfileClick = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  const handlePostComment = (event, post) => {
    if (event.key === "Enter") {
      handleCommentSubmit(post._id, comments[post._id], setComments, setPosts, selectedPost, setSelectedPost);
    }
  };

  const toggleLike = async (post) => {
    if (post.likes.includes(userId)) {
      await quitarLike(post, setPosts);
    } else {
      await darLike(post, setPosts);
    }
  };

  return (
    <div className="feed-container">
      <div className="sidebar">
        <Button className="sidebar-button" onClick={() => navigate('/feed')}>
          <i className="fas fa-home"></i> Inicio
        </Button>
        <Button className="sidebar-button">
          <i className="fas fa-bell"></i> Notificaciones
        </Button>
        <Button className="sidebar-button">
          <i className="fas fa-plus-square"></i> Crear
        </Button>
        <Button className="sidebar-button" onClick={handleProfileClick}>
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
        </Button>
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
                <button
                  onClick={() => toggleLike(post)}
                  className="like-button"
                >
                  {post.likes.includes(userId) ? "Quitar Like" : "Dar Like"}
                </button>
              </div>
              <div className="post-comment-section">
                <Input
                  type="text"
                  placeholder="Escribe un comentario..."
                  value={comments[post._id] || ""}
                  onChange={(e) => handleCommentChange(post._id, e.target.value, setComments)}
                  onKeyDown={(e) => handlePostComment(e, post)}
                  className="comment-input"
                />
              </div>
            </div>
          ))}
        </div>
        {showModal && selectedPost && (
          <Modal onClose={closeModal}>
            <Publicacion selectedPost={selectedPost} setPosts={setPosts}/>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
