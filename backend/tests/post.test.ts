jest.mock('../models/user.js', () => ({
    __esModule: true,
    default: {
        create: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
    }
}));

jest.mock('../models/chat.js', () => ({
    __esModule: true,
    default: {
        create: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
    }
}));

import User from '../models/user.js';
import Chat from '../models/chat.js';
import { createUser } from '../controllers/userController.js';
import { createChat } from '../controllers/chatController.js';
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

const mockChat = {
    user1: "user1",
    user2: "user2" 
}

describe('Post Requests', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseObject: any;
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

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser routes', () => {
        test("successful createUser request - expected 201", async () => {
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
        });

        test("unsuccessful createUser request returns 400", async () => {
            // Arrange
            (User.create as jest.Mock).mockImplementation(() => {
                throw new Error("errorMessage");
            });

            // Act
            await createUser(mockRequest as Request, mockResponse as Response);

            // Assert
            expect(User.create).toHaveBeenCalledWith(mockUser);
            expect(responseObject.status).toHaveBeenCalledWith(400);
            expect(responseObject.json).toHaveBeenCalledWith({
                error: "errorMessage"
            });
        });
    });

    describe('createChat routes', () => {
        test("successful createChat request returns 201", async () => {
            // Arrange
            (Chat.find as jest.Mock).mockResolvedValue([]);
            (Chat.create as jest.Mock).mockResolvedValue(mockChat);
            mockRequest = {
                body: mockChat
            }

            // Act
            await createChat(mockRequest as Request, mockResponse as Response);

            // Assert
            expect(Chat.create).toHaveBeenCalledWith(mockChat);
            expect(Chat.create).toHaveBeenCalledTimes(1);
            expect(responseObject.status).toHaveBeenCalledWith(201);
            expect(responseObject.json).toHaveBeenCalledWith(mockChat);
        });

        test("unsuccessful createChat request when Chat already exists returns 401", async () => {
            // Arrange
            (Chat.find as jest.Mock).mockResolvedValue([mockChat]);
            mockRequest = {
                body: mockChat
            }

            // Act
            await createChat(mockRequest as Request, mockResponse as Response);

            // Assert
            expect(Chat.create).not.toHaveBeenCalled();
            expect(responseObject.status).toHaveBeenCalledWith(400);
            expect(responseObject.json).toHaveBeenCalledWith({
                error: "Chat Already Exists"
            });
        })
    })
});