import { useEffect, useState } from "react";
import "../styles/FeedPage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);



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
              />
            </div>
            <div className="post-caption">
              <p>{post.caption}</p>
            </div>
            <div className="post-comments">
              {post.comments.map((comments) => (
                <p key={comments}>{comments.content}</p>
              ))}
              <p>{post.comments.length} comentarios</p>
            </div>
            <div className="post-likes">
              <p>{post.likes.length}</p>
              <p> likes </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
