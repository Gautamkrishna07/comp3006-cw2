import { Link } from "react-router-dom";
import { User } from "lucide-react";
import FollowButton from "./FollowButton";

const UserList = ({ users, title }) => {
    console.log(users);

    return ( 
        <div className="listContainer">
            <h2>{ title }</h2>

            { users && users.length > 0 ? (
                <ul className="list">
                    { users.map((user) => (
                        <li key={user._id} className="userItem">
                            <div className="userCard">

                                <div className="avatar">
                                    <User size={20} />
                                </div>

                                <Link to={`/profile/${user.username}`}>
                                    <span className="fullName">{ user.follower_id?.firstName || "Anonymous User" }{ user.follower_id?.lastName }</span>
                                    <span className="handle">{ user.follower_id.username }</span>
                                </Link>

                                <div className="actions">
                                    <FollowButton targetUser={user._id} size={24} />
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="centred">No users found.</p>
            )}
        </div>
    );
}
 
export default UserList;