import { BASE_URL, POST_URL,FEED_URL, USER_URL, PROFILE_URL, SUMMIT_COMMENT_URL } from "../../routes";

export const fetchPosts = async (setPosts) => {
    try {
      const response = await fetch(BASE_URL+POST_URL+FEED_URL, {
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
  
  export const fetchUserProfile = async (userId, setUserProfile) => {
    try {
      const response = await fetch(BASE_URL+USER_URL+PROFILE_URL+userId, {
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
  
  export const handleCommentSubmit = async (postId, commentText, setComments, setPosts, selectedPost, setSelectedPost) => {
    if (!commentText.trim()) return;
  
    try {
      const response = await fetch(BASE_URL+POST_URL+postId+SUMMIT_COMMENT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: commentText }),
      });
  
      if (response.ok) {
        const newComment = await response.json();
        if (selectedPost && selectedPost._id === postId) {
          setSelectedPost((prevPost) => ({
            ...prevPost,
            comments: [...prevPost.comments, newComment],
          }));
        }

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? { ...post, comments: [...post.comments, newComment] }
              : post
          )
        );
  
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: "", 
        }));
        await fetchPosts(setPosts);
      } else {
        console.error("Error al crear el comentario");
      }
    } catch (error) {
      console.error("Error al enviar el comentario", error);
    }
  };
  
  export const handleCommentChange = (postId, text, setComments) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: text,
    }));
  };
  