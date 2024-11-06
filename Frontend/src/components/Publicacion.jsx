import "../styles/FeedPage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Comment from "./Comment";

const darLike = async(post) => {
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

const quitarLike = async(post) => {
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

const Publicacion = ({selectedPost}) => {
    return(
            <div>
            <img
              src={selectedPost.imageUrl}
              alt="Post"
              className="modal-post-image"
              onClick={() => darLike(selectedPost)}
            />
            <button onClick={()=> darLike(selectedPost)}> Dar Like </button>
            <button onClick={()=> quitarLike(selectedPost)}> Quitar Like </button>
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
    );
};

export default Publicacion;