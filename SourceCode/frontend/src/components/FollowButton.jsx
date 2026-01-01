import clsx from "clsx";
import { UserRoundPlus, UserRoundMinus, UserRoundCheck } from "lucide-react";

import { useRelationship } from "../hooks/useRelationshipContext";
import styles from "../styles/FollowButton.module.css";

const FollowButton = ({ targetUser, size = 18 }) => {
    const { follow, unfollow, isAlreadyFollowing } = useRelationship();
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
            aria-label={alreadyFollowing
                ? "Unfollow"
                : "Follow"
            }
        >
            {!alreadyFollowing ? (
                <UserRoundPlus size={size} />
            ) : (
                <>
                    <UserRoundCheck size={size} className={styles.checkIcon} />
                    <UserRoundMinus size={size} className={styles.minusIcon} />
                </>
            )}

        </button>
    );
};

export default FollowButton;
