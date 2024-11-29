export const darLike = async(post,setPosts) => {
    try{
      const response = await fetch(`http://localhost:3001/api/posts/${post._id}/like`,{
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
      const response = await fetch(`http://localhost:3001/api/posts/${post._id}/like`,{
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
  