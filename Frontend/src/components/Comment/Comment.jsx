import { useEffect, useState } from "react";


const Comment = ({ id }) => {
  const [comment, setComment] = useState({});
  const [userName, setUserName] = useState("");

  const fetchComment = async () => {
    try {
      
      const response = await fetch(`http://localhost:3001/api/posts/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al cargar el comentario");
      }

      const data = await response.json();
      setComment(data);
      fetchUserName(data.user._id);
    } catch (error) {
      console.error("Error al cargar el comentario", error);
    }
  };

  const fetchUserName = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al cargar el usuario");
      }

      const userData = await response.json();
      setUserName(userData.user.username);
    } catch (error) {
      console.error("Error al cargar el nombre del usuario", error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, [id]);

  return (
    <div className="comment">
      <p className="comment-text">{`${userName}: ${comment.content}`}</p>
      <p className="comment-date">{`Fecha: ${new Date(comment.createdAt).toLocaleDateString()}`}</p>
    </div>
  );
};

export default Comment;