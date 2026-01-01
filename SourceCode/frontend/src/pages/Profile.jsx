import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import { User } from "lucide-react";

import PostCard from "../components/PostCard";
import FollowButton from "../components/FollowButton";

import styles from "../styles/Profile.module.css";
import postStyles from "../styles/Feed.module.css";

const Profile = () => {
    const { username } = useParams();
    const { user: currentUser } = useAuthContext();

    const [ profile, setProfile ] = useState(null);
    const [ posts, setPosts ] = useState([]);
    const [ totalPosts, setTotalPosts ] = useState(0);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const baseUrl = process.env.REACT_APP_API_BASE_URL || "/api";

    const fetchInitialProfile = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const [ userResponse, postsResponse ] = await Promise.all([
                fetch(`${baseUrl}/users/username/${username}`),
                fetch(`${baseUrl}/posts/user/${username}?page=1`),
            ]);

            if (!userResponse.ok) throw new Error("User not found.");
            if (!postsResponse.ok) throw new Error("Failed to fetch users' posts.");

            const [ userData, postsData ] = await Promise.all([
                userResponse.json(),
                postsResponse.json(),
            ]);

            console.log(postsData);

            setProfile(userData);
            setPosts(postsData.posts);
            setTotalPosts(postsData.totalPosts);
            setHasMore(postsData.hasMore);
            setPage(1);

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }

    }, [ baseUrl, username ]);

    const loadMore = useCallback(async () => {
        if (!hasMore || isFetchingMore) return;

        setIsFetchingMore(true);
        const nextPage = page + 1;

        try {
            const response = await fetch(`${baseUrl}/posts/user/${username}?page=${nextPage}`);
            const json = await response.json();

            if (response.ok) {
                setPosts(prev => [...prev, ...json.posts]);
                setHasMore(json.hasMore);
                setPage(nextPage);
            }
        } catch (error) {
            setError("Failed to fetch additional posts.");
        } finally {
            setIsFetchingMore(false);
        }
    }, [ baseUrl, hasMore, page, username ]);

    useEffect(() => {
        fetchInitialProfile();
    }, [ fetchInitialProfile ]);

    const isOwner = currentUser?.username === username;

    if (isLoading) return <div className="centred">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className={styles.container}>
            <header className={styles.profileHeader}>
                <div className={styles.avatar}>
                    <User size={48} />
                </div>
                
                <div className={styles.details}>
                    <div className={styles.nameRow}>
                        <h1>{profile?.firstName || "Anonymous"} {profile.lastName}</h1>
                        {currentUser && !isOwner && (
                            <FollowButton targetUser={profile._id} />
                        )}
                    </div>
                    <p className={styles.handle}>@{profile.username}</p>
                    
                    <div className={styles.metrics}>
                        <Link
                            to="./following"
                        >
                            <strong>{profile.followingCount || 0}</strong> Following
                        </Link> |

                        <Link
                            to="./followers"
                        >
                            <strong>{profile.followerCount || 0}</strong> Followers
                        </Link> |

                        <span><strong>{totalPosts || 0}</strong> Posts</span>
                    </div>
                </div>
            </header>

            <div className={postStyles.feed}>
                <h2>Posts</h2>
                {posts.length > 0 ? (
                    posts.map(post => <PostCard key={post._id} post={post} />)
                ) : (
                    <p className="small centred">No posts yet.</p>
                )}

                { hasMore && (
                    <button onClick={loadMore} className={postStyles.loadMoreButton}>
                        Load More Posts
                    </button>
                )}
                { !hasMore && (
                    <button className={postStyles.loadMoreButton} disabled>
                        Nothing left to load!
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;
