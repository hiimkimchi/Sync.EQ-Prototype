import User from '../models/user.js';
import { getSpecificUser} from '../controllers/userController.js';
import { Request, Response } from 'express';


// Tests for getting a single user by username
describe('Single User', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Tests for getSpecificUser function
    describe('getSpecificUser', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        // Test for successful retrieval of a specific user
        test('return status is 200', async () => {
            // Mock user data
            const mockUser = new User({
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
            });
            // Mock the User.findOne method to return the mock user
            jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

            const req = { params: { username: 'mockUser' } } as any as Request;

            const json = jest.fn();
            const status = jest.fn(() => ({ json })) as unknown as Response['status'];
            const res = { status } as any as Response;

            await getSpecificUser(req, res);

            expect(status).toHaveBeenCalledWith(200);
        });
        
        test('finds a specific user with username', async () => {
            const mockUser = new User({
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
            });
            jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

            const req = { params: { username: 'mockUser' } } as any as Request;

            const json = jest.fn();
            const status = jest.fn(() => ({ json })) as any as Response['status'];
            const res = { status } as any as Response;

            await getSpecificUser(req, res);

            expect(status).toHaveBeenCalledWith(200);
            expect(json).toHaveBeenCalledWith(expect.objectContaining({ username: 'mockUser' }));
        });


        test('return 404 if user is not found', async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue(null);

            const req = { params: { username: 'incognito' } } as any as Request;

            const json = jest.fn();
            const status = jest.fn(() => ({ json })) as any as Response['status'];
            const res = { status } as any as Response;

            await getSpecificUser(req, res);

            expect(status).toHaveBeenCalledWith(404);
            expect(json).toHaveBeenCalledWith(expect.objectContaining({ error: 'User not found' }));
        });
    });
});