import { describe, it, expect } from "vitest";

import { postReducer } from "./PostContext";

describe("postReducer ADD_POST", () => {
    const initialState = {
        posts: [],
        hasMore: false,
        totalPosts: 0,
        feedtype: {
            type: "global",
            username: null
        }
    };

    const mockPost = {
        _id: "12345",
        author_id: {
            _id: "67890",
            username: "cranes-planes-migraines"
        },
        body: "Under the tree, spider and me."
    };

    it ("Adds post to state when on Global feed", () => {
        // Arrange
        const action = {
            type: "ADD_POST",
            payload: {
                ...mockPost,
                isFollowingAuthor: false
            }
        };
        // Act
        const state = postReducer(initialState, action);
        // Assert
        expect(state.posts).toHaveLength(1);
        expect(state.totalPosts).toBe(1);
    });

    it ("Doesn't add post to Following feed if isFollowingAuthor is false", () => {
        // Arrange
        const followingState = { ...initialState, feedtype: { type: "following" } };
        const action = {
            type: "ADD_POST",
            payload: {
                ...mockPost,
                isFollowingAuthor: false
            }
        };
        // Act
        const state = postReducer(followingState, action);
        // Assert
        expect(state.posts).toHaveLength(0);
    });

    it ("Add Post to Profile fed IF usernames match", () => {
        // Arrange
        const profileState = { ...initialState, feedtype: { type: "profile", username: "cranes-planes-migraines" } };
        const action = { type: "ADD_POST", payload: mockPost }; // Username: "cranes-planes-migraines"
        // Act
        const state = postReducer(profileState, action);
        // Assert
        expect(state.posts).toHaveLength(1);
    });

    it ("Dont add Post to profile feed if usernames DON'T match", () => {
        // Arrange
        const profileState = { ...initialState, feedtype: { type: "profile", username: "venusian-2" } };
        const action = { type: "ADD_POST", payload: mockPost }; // Username: "cranes-planes-migraines"
        // Act
        const state = postReducer(profileState, action);
        // Assert
        expect(state.posts).toHaveLength(0);
    });
});

describe("postReducer SET_POST / LOAD_MORE_POSTS Pagination", () => {
    const initialState = {
        posts: [ { _id: "old-123", body: "You taste like honey, all warm and runny." } ],
        hasMore: false,
        totalPosts: 0
    };

    it ("SET_POST replaces existing post state", () => {
        // Arrange
        const action = ({
            type: "SET_POSTS",
            payload: {
                posts: [ {  _id: "new-123", body: "Kinder than candy, effervescent candy." } ],
                hasMore: true,
                totalPosts: 10
            }
        });
        // Act
        const newState = postReducer(initialState, action);
        // Assert
        expect(newState.posts).toHaveLength(1);
        expect(newState.posts[0]._id).toBe("new-123");
        expect(newState.hasMore).toBe(true);
        expect(newState.totalPosts).toBe(10);
    });

    it ("LOAD_MORE_POSTS appends newly loaded posts to existing state", () => {
        // Arrange
        const action = ({
            type: "LOAD_MORE_POSTS",
            payload: {
                posts: [ {  _id: "new-123", body: "Kinder than candy, effervescent candy." } ],
                hasMore: false,
            }
        });
        // Act
        const newState = postReducer(initialState, action);
        // Assert
        expect(newState.posts).toHaveLength(2);
        expect(newState.posts[0]._id).toBe("old-123");
        expect(newState.posts[1]._id).toBe("new-123");
        expect(newState.hasMore).toBe(false);
    });
});
