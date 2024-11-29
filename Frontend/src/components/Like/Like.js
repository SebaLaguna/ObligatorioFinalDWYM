import { BASE_URL,POST_URL,LIKE_URL } from "../../routes";

export const darLike = async(post,setPosts) => {
    try{
      const response = await fetch(BASE_URL+POST_URL+post._id+LIKE_URL,{
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error al dar un like');
      }
      const updatedPost = await response.json(); 
      setPosts((prevPosts) =>
      prevPosts.map((p) => (p._id === post._id ? updatedPost : p))
    );
    } catch (error){
      console.error("Error al dar un like", error);
    }
  }
  
  export const quitarLike = async(post,setPosts) => {
    try{
      const response = await fetch(BASE_URL+POST_URL+post._id+LIKE_URL,{
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error al quitar un like');
      }
      const updatedPost = await response.json(); 
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === post._id ? updatedPost : p))
      );
    }catch (error){
      console.error("Error al quitar un like",error)
    }
  }
  