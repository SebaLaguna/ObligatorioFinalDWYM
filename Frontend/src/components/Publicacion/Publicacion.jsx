import "../../styles/FeedPage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Comment from "../Comment/Comment";
import { darLike,quitarLike } from "../Like/Like";

const Publicacion = ({selectedPost}) => {


    return(
            <div>
            <img
              src={selectedPost.imageUrl}
              alt="Post"
              className="modal-post-image"
            />
            <div className="modal-caption">
              <p>{selectedPost.caption}</p>
            </div>
            <div className="modal-comments">
              <p>{selectedPost.comments.length} comentarios</p>
              {selectedPost.comments.map((comment) => (
                <Comment key={comment._id} id={comment} />
              ))}
            </div>
            <div className="modal-likes">
              <p>{selectedPost.likes.length} likes</p>
            </div>
            <div>
              <button onClick={()=> darLike(selectedPost)}> Dar Like </button>
              <button onClick={()=> quitarLike(selectedPost)}> Quitar Like </button>
            </div>
           </div>
    );
};

export default Publicacion;