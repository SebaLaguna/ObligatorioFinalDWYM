import { useEffect, useState } from "react";
import "../styles/FeedPage.css";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  // Función para cargar los posts
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
  }, []); // Solo ejecutar al montar el componente

  return (
    <div className="feed-container">
      <h2>Feed</h2>
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
              <p>{post.comments[0]} ID  </p>
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
