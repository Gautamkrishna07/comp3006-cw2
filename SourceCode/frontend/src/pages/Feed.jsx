import { usePosts } from "../hooks/usePosts";
import { useState } from "react";
import PostCard from "../components/PostCard";

const Feed = () => {
    const { posts, hasMore, dispatch } = usePosts();
    const [ page, setPage ] = useState(1);

    const loadMore = async () => {
        const nextPage = page + 1;

        const baseUrl = process.env.REACT_APP_API_BASE_URL || "/api";
        const response = await fetch(`${baseUrl}/posts?page=${nextPage}`);
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "LOAD_MORE_POSTS", payload: json });
            setPage(nextPage);
        }
    }

    return ( 
        <div className="feed">
            <h2>Feed</h2>

            <div className="posts-list">
                { posts && posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}

                { posts && posts.length === 0 && (
                    <p>No posts yet!</p>
                )}

                { hasMore && (
                    <button onClick={loadMore} className="load-more-button">
                        Load More Posts
                    </button>
                )}
            </div>
        </div>
     );
}
 
export default Feed;
