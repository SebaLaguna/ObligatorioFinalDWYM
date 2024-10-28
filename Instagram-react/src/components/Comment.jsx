import { useEffect, useState } from "react";
import "../styles/Comment.css";

const Comment = () => {

    const [comment, setComment] = useState([]);

    const fetchComment = async () => {
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
}