import clsx from "clsx";
import { UserRoundPlus, UserRoundMinus, UserRoundCheck } from "lucide-react";

import { useRelationship } from "../hooks/useRelationshipContext";
import styles from "../styles/FollowButton.module.css";

const FollowButton = ({ targetUser }) => {
    const { follow, unfollow, isAlreadyFollowing, following } = useRelationship();
    const alreadyFollowing = isAlreadyFollowing(targetUser);

    const handleClick = () => {
        alreadyFollowing
            ? unfollow(targetUser)
            : follow(targetUser);
    };

    return (
        <button
            onClick={handleClick}
            className={clsx(styles.button, {
                [styles.follow]: !alreadyFollowing,
                [styles.unfollow]: alreadyFollowing
            })}
            title={alreadyFollowing
                ? "Unfollow"
                : "Follow"
            }
        >
            {!alreadyFollowing ? (
                <UserRoundPlus size={18} />
            ) : (
                <>
                    <UserRoundCheck size={18} className={styles.checkIcon} />
                    <UserRoundMinus size={18} className={styles.minusIcon} />
                </>
            )}

        </button>
    );
};

export default FollowButton;
