jest.mock('../models/user.js', () => ({
    __esModule: true,
    default: {
        create: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
    }
}));
jest.mock('../models/post.js', () => ({
    __esModule: true,
    default: {
        create: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
    }
}));
import User from '../models/user.js';
import Post from '../models/post.js'
import { createUser } from '../controllers/userController.js';
import { createPost } from '../controllers/postController.js'
import { Request, Response } from 'express';

const mockUser = {
    auth0id: "auth0|206",
    username: "mockUser",
    artistAlias: "Test Artist",
    professions: ["Producer", "Composer"],
    genres: ["Electronic", "Ambient"],
    biography: "This is a test user for unit testing.",
    phone_num: "123-456-7890",
    email: "hola@gmail.com",
    daws: ["Ableton Live", "FL Studio"],
    external_visits: ["http://example.com/visitme", ],
    profile_pic: "",
    social_media: {
        "Instagram": "http://instagram.com/testuser1",
        "Twitter": "http://twitter.com/testuser1"
    }
}

const mockPost = {
    author: "johndoe",
    title: "Test Post",
    content: "test content",
    mediaID: null,
    likes_usernames: [],
    reposts_usernames: []
}

describe('Post Requests', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseObject: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create user route should return respective status', () => {
        beforeEach(() => {
            mockRequest = {
                body: mockUser
            };
            responseObject = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
            }
            mockResponse = responseObject;
        })

        test("successful createUser request", async () => {
            // Arrange
            (User.create as jest.Mock).mockResolvedValue(mockUser);
            mockRequest = {
                body: mockUser
            }

            // Act
            await createUser(mockRequest as Request, mockResponse as Response);

            // Assert
            expect(User.create).toHaveBeenCalledWith(mockUser);
            expect(User.create).toHaveBeenCalledTimes(1);
            expect(responseObject.status).toHaveBeenCalledWith(201);
            expect(responseObject.json).toHaveBeenCalledWith(mockUser);
        })
        test("unsuccessful createUser request", async () => {
            // Arrange
            const mockError = new Error("Invalid user data");
            (User.create as jest.Mock).mockRejectedValue(mockError);

            mockRequest = {
                body: mockUser // or invalid mock if needed
            };

            // Act
            await createUser(mockRequest as Request, mockResponse as Response);

            // Assert
            expect(User.create).toHaveBeenCalledTimes(1);
            expect(responseObject.status).toHaveBeenCalledWith(400);
            expect(responseObject.json).toHaveBeenCalledWith({
                error: mockError.message
            });
        })
    });
    describe('create post route should return respective status', () => {
        beforeEach(() => {
            mockRequest = {
                body: mockPost
            };
            responseObject = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
            }
            mockResponse = responseObject;
        })

        test("successful createPost when previous posts exist", async () => {
            const mockLastPost = { postId: 5 };

            (Post.findOne as jest.Mock).mockReturnValue({
                sort: jest.fn().mockResolvedValue(mockLastPost)
            });

            const createdPost = { ...mockRequest.body, postId: 6 };
            (Post.create as jest.Mock).mockResolvedValue(createdPost);

            await createPost(mockRequest as Request, mockResponse as Response);

            // findOne correctly called
            expect(Post.findOne).toHaveBeenCalledWith({ author: "johndoe" });

            // create called with incremented postId
            expect(Post.create).toHaveBeenCalledWith({
                ...mockRequest.body,
                postId: 6
            });

            expect(responseObject.status).toHaveBeenCalledWith(201);
            expect(responseObject.json).toHaveBeenCalledWith(createdPost);
        });
        
        test("successful createPost when user has no previous posts", async () => {
            (Post.findOne as jest.Mock).mockReturnValue({
                sort: jest.fn().mockResolvedValue(null)
            });

            const createdPost = { ...mockRequest.body, postId: 1 };
            (Post.create as jest.Mock).mockResolvedValue(createdPost);

            await createPost(mockRequest as Request, mockResponse as Response);

            expect(Post.create).toHaveBeenCalledWith({
                ...(mockRequest.body as any),
                postId: 1
            });

            expect(responseObject.status).toHaveBeenCalledWith(201);
            expect(responseObject.json).toHaveBeenCalledWith(createdPost);
        });

        test("unsuccessful createPost returns 400", async () => {
            const mockError = new Error("Invalid post data");

            (Post.findOne as jest.Mock).mockReturnValue({
                sort: jest.fn().mockResolvedValue(null)
            });
            (Post.create as jest.Mock).mockRejectedValue(mockError);

            await createPost(mockRequest as Request, mockResponse as Response);

            expect(responseObject.status).toHaveBeenCalledWith(400);
            expect(responseObject.json).toHaveBeenCalledWith({
                error: "Invalid post data"
            });
        });
    });
});