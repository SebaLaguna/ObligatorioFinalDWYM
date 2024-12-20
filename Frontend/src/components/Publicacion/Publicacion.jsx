import "../../styles/FeedPage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Comment from "../Comment/Comment";
import { BASE_URL } from "../../routes";

const Publicacion = ({selectedPost}) => {

    return(
            <div>
            <img
              src={BASE_URL+selectedPost.imageUrl}
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
           </div>
    );
};

export default Publicacion;