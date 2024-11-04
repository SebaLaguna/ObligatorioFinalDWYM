import { useEffect, useState } from "react";
import "../styles/FeedPage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Comment from "../components/Comment";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

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
      setPosts(data);
    } catch (error) {
      console.error("Error al cargar el feed", error);
    }
  };

  useEffect(() => {
    fetchPosts();
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
        <button className="sidebar-button">
          <i className="fas fa-user"></i> Perfil
        </button>
      </div>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <div className="post-header">
              <img
                src={post.user.profilePicture || "/default-profile.png"}
                alt="Profile"
                className="profile-picture"
              />
              <span className="username">{post.user.username}</span>
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
              <p>{post.likes.length}</p>
              <p> likes </p>
            </div>
          </div>
        ))}
      </div>
      
      {showModal && selectedPost && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>&times;</span>
            <img
              src={selectedPost.imageUrl}
              alt="Post"
              className="modal-post-image"
            />
            <div className="modal-caption">
              <p>{selectedPost.caption}</p>
            </div>
            <div className="modal-comments">
              <p>{selectedPost.comments.length} comentarios</p>
              {selectedPost.comments.map((comment) => (
                <Comment key={comment} id={comment} />
              ))}
            </div>
            <div className="modal-likes">
              <p>{selectedPost.likes.length} likes</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedPage;


