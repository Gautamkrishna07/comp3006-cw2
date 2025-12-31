import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    console.log(post);

    return (
        <div className="post-card">
            <h4>{ post.author_id?.username || "Anonymous" }</h4>
            <p className="post-body">{ post.body }</p>
            <p className="post-date">{ new Date(post.createdAt).toLocaleString() }</p>
        </div>
    );
};

export default PostCard;
