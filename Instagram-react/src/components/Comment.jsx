import { useEffect, useState } from "react";
import "../styles/Comment.css";

const Comment = ({id}) => {

    const [comment, setComment] = useState([]);

    const fetchComment = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/comments/:${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Error al cargar el feed");
        }
  
        const data = await response.json();
        setComment(data);
      } catch (error) {
        console.error("Error al cargar los comentarios", error);
      }
    };
  
    useEffect(() => {
      fetchComment();
    }, []);

    return(
      <div>
        {comment && <p className=".comment-text">{comment.content}</p>}
      </div>
    );
}
export default Comment;