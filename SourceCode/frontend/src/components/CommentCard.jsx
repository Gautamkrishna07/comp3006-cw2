import { Trash, User } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import commentStyles from "../styles/Comments.module.css";
import cardStyles from "../styles/PostCard.module.css";

const CommentCard = ({ comment, postId }) => {
    const { user } = useAuthContext();
    const isOwner = user && user._id === (comment.author_id?._id || comment.author_id);

    const baseUrl = process.env.REACT_APP_API_BASE_URL || "/api";

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your comment?")) return;

        try {
            const response = await fetch(`${baseUrl}/posts/${postId}/comments/${comment._id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });

            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.error || "Failed to delete comment.");
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };

    return (
        <div className={ commentStyles.item }>
            <div className={ commentStyles.itemHeader }>
                <div className={commentStyles.authorInfo}>
                    <div className={cardStyles.avatar}>
                        <User size={20} />
                    </div>

                    <Link
                        to={`/profile/${comment.author_id?.username}`}
                        className={commentStyles.author}
                    >
                        {comment.author_id?.username || "Anonymous"}
                    </Link>

                    { isOwner && (
                        <button
                            onClick={ handleDelete }
                            className={commentStyles.deleteButton}
                            aria-label="Delete comment"
                        >
                            <Trash size={18} />
                        </button>
                    )}
                </div>
            </div>

            <p className={ commentStyles.body }>{ comment.body }</p>

            <span className={ commentStyles.date }>
                { new Date(comment.createdAt).toLocaleString() }
            </span>
        </div>
    );
};

export default CommentCard;
