import { createContext, useReducer, useEffect, useCallback } from "react";

import { useAuthContext } from "../hooks/useAuthContext";

export const RelationshipContext = createContext();

const relationshipReducer = (state, action) => {
    switch (action.type) {
        case "SET_FOLLOWING":
            return { following: action.payload };
        case "CLEAR_FOLLOWING":
            return { following: [] };
        case "FOLLOW":
            return { following: [ ...state.following, String(action.payload) ] };
        case "UNFOLLOW":
            return { following: state.following.filter(id => id !== String(action.payload)) };
        default:
            return state;
    }
};

export const RelationshipContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(relationshipReducer, { following: [] });
    const { user } = useAuthContext();

    // const socketUrl = process.env.REACT_APP_BASE_URL || "/";
    const baseUrl = process.env.REACT_APP_API_BASE_URL || "/api";

    useEffect(() => {
        if (!user?._id) {
            dispatch({ type: "CLEAR_FOLLOWING" });
            return;
        };

        const fetchFollowing = async () => {
            try {
                const response = await fetch(`${baseUrl}/relationships/${user._id}/following`, {
                    headers: {
                        "Authorization": `Bearer ${user?.token}`
                    },
                });

                const json = await response.json();

                if (response.ok) {
                    const ids = json.map(f => String(f.following_id._id));
                    dispatch({ type: "SET_FOLLOWING", payload: ids });
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error("Failed to fetch following list: " + error);
            }
        };

        fetchFollowing();
    }, [ user?._id, user?.token, baseUrl ]);

    const isAlreadyFollowing = useCallback((userId) => {
        return state.following.some(id => String(id) === String(userId));
    }, [ state.following ]);

    const follow = async (targetUserId) => {
        if (!user) return;

        try {
            const response = await fetch(`${baseUrl}/relationships/${targetUserId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                }
            });

            if (response.ok) {
                dispatch({ type: "FOLLOW", payload: String(targetUserId) });
            }

        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Failed to follow: " + error);
        }
    };

    const unfollow = async (targetUserId) => {
        if (!user) return;

        try {
            const response = await fetch(`${baseUrl}/relationships/${targetUserId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${user?.token}`
                }
            });

            if (response.ok) {
                dispatch({ type: "UNFOLLOW", payload: String(targetUserId) });
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Failed to follow: " + error);
        }
    };

    return (
        <RelationshipContext.Provider value={{ ...state, follow, unfollow, isAlreadyFollowing }}>
            { children }
        </RelationshipContext.Provider>
    );
};
