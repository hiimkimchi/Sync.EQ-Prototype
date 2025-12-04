import User from '../models/user.js';
import { getSpecificUsers} from '../controllers/userController.js';
import { Request, Response } from 'express';

// Tests for getting a list of users with specific filters
describe('List of Objects', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Tests for getSpecificUsers function
    describe('getSpecificUsers', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        // Test for successful retrieval of users with genre filter
        test('return status is 200 when filtering with genre', async () => {
            // Create mock users
            const mockUsers = [
                new User({
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
                    profile_pic: Buffer.from(""),
                    social_media: {
                        "Instagram": "http://instagram.com/testuser1",
                        "Twitter": "http://twitter.com/testuser1"
                    }
                }),
                new User({
                    auth0id: "auth0|207",
                    username: "mockUser2",
                    artistAlias: "Test Artist",
                    professions: ["Producer", "Composer"],
                    genres: ["Electronic", "Ambient"],
                    biography: "This is a test user for unit testing.",
                    phone_num: "123-456-7890",
                    email: "hola@gmail.com",
                    daws: ["Ableton Live", "FL Studio"],
                    external_visits: ["http://example.com/visitme", ],
                    profile_pic: Buffer.from(""),
                    social_media: {
                        "Instagram": "http://instagram.com/testuser1",
                        "Twitter": "http://twitter.com/testuser1"
                    }
                })
            ];
            // Mock the User.find method to return the mock users
            jest.spyOn(User, 'find').mockResolvedValue(mockUsers as any[]);

            // Create mock request and response objects
            const req = { query: { genre: "Electronic" } } as any as Request;

            const json = jest.fn();
            const status = jest.fn(() => ({ json })) as any as Response['status'];
            const res = { status } as any as Response;

            // Call the controller function
            await getSpecificUsers(req, res);

            // Assertions
            expect(status).toHaveBeenCalledWith(200);
        });
        

        test('returns users with username', async () => {
            // Create mock users
            const mockUsers = [
                new User({
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
                    profile_pic: Buffer.from(""),
                    social_media: {
                        "Instagram": "http://instagram.com/testuser1",
                        "Twitter": "http://twitter.com/testuser1"
                    }
                }),
                new User({
                    auth0id: "auth0|207",
                    username: "mockUser2",
                    artistAlias: "Test Artist",
                    professions: ["Producer", "Composer"],
                    genres: ["Electronic", "Ambient"],
                    biography: "This is a test user for unit testing.",
                    phone_num: "123-456-7890",
                    email: "hola@gmail.com",
                    daws: ["Ableton Live", "FL Studio"],
                    external_visits: ["http://example.com/visitme", ],
                    profile_pic: Buffer.from(""),
                    social_media: {
                        "Instagram": "http://instagram.com/testuser1",
                        "Twitter": "http://twitter.com/testuser1"
                    }
                })
            ];
            // Mock the User.find method to return the mock users
            jest.spyOn(User, 'find').mockResolvedValue(mockUsers as any[]);

            // Create mock request and response objects
            const req = { query: { username: "mock" } } as any as Request;

            const json = jest.fn();
            const status = jest.fn(() => ({ json })) as any as Response['status'];
            const res = { status } as any as Response;

            // Call the controller function
            await getSpecificUsers(req, res);

            // Assertions
            expect(status).toHaveBeenCalledWith(200);
            expect(json).toHaveBeenCalledWith(expect.arrayContaining(mockUsers));
        });


        test('return 404 if no users found', async () => {
            // Mock the User.find method to return an empty array
            jest.spyOn(User, 'find').mockResolvedValue([] as any[]);

            // Create mock request and response objects
            const req = { query: { genre: "NonExistentGenre" } } as any as Request; 
            const json = jest.fn();
            const status = jest.fn(() => ({ json })) as any as Response['status'];
            const res = { status } as any as Response;

            // Call the controller function
            await getSpecificUsers(req, res);

            // Assertions
            expect(status).toHaveBeenCalledWith(404);
        });
    });
});
