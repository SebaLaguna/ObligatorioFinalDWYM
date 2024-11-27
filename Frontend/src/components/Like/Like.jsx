

export const darLike = async(post) => {
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
    } catch (error){
      console.error("Error al dar un like", error);
    }
  }
  
  export const quitarLike = async(post) => {
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
    }catch (error){
      console.error("Error al quitar un like",error)
    }
  }
  