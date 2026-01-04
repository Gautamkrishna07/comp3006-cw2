import jwt from "jsonwebtoken";
import request from "supertest";
import { describe, it, expect, vi } from "vitest";

import User from "../models/userModel";
import app from "../server";

vi.mock("../models/userModel");
vi.mock("jsonwebtoken");

describe("requireAuth Middleware (Integration)", () => {
    it ("Returns 401 if no Authorization header is present", async () => {
        const response = await request(app)
            .post("/api/posts/");

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Authorization header required");
    });

    it ("Returns 401 if token is invalid", async () => {
        jwt.verify.mockImplementation(() => { throw new Error("Invalid token");});

        const response = await request(app)
            .post("/api/posts/")
            .set("Authorization", "Bearer bad-token");

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Request not authorized.");
    });

    it ("Returns 401 if token is malformed", async () => {
        jwt.verify.mockImplementation(() => { throw new Error("Invalid token");});

        const response = await request(app)
            .post("/api/posts/")
            .set("Authorization", "malformed-token");

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Request not authorized.");
    });

    it ("Return 404 if user doesn't exist in database", async () => {
        jwt.verify.mockReturnValue({ _id: "deleted-user-id" });
        User.findById.mockReturnValue({
            select: vi.fn().mockResolvedValue(null)
        });

        const response = await request(app)
            .post("/api/posts/")
            .set("Authorization", "Bearer good-token");

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("User not found.");
    });
});
