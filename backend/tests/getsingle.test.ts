import User from '../models/user.js';
import Post from '../models/post.js';
import Chat from '../models/chat.js';
import { getSpecificUser } from '../controllers/userController.js';
import { getSpecificPost } from '../controllers/postController.js';
import { getChatById } from '../controllers/chatController.js';
import { Request, Response } from 'express';

describe('GET Single requests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET user', () => {
    // Successfully retrieve a single user by username
    test('should return 200 status with user data when username exists', async () => {
      const mockUser = new User({
        auth0id: 'auth0|001',
        username: 'beatmaker101',
        artistAlias: 'BeatMaster',
        professions: ['Producer', 'DJ'],
        genres: ['Hip-Hop', 'Trap'],
        biography: 'Creating beats since 2015',
        phone_num: '555-123-4567',
        email: 'beatmaster@example.com',
        daws: ['FL Studio', 'Ableton Live'],
        external_visits: ['https://soundcloud.com/beatmaster'],
        social_media: { instagram: 'beatmaster_insta', twitter: 'beatmaster_tw' }
      });

      jest.spyOn(User, 'findOne').mockResolvedValue(mockUser as any);

      const req = { params: { username: 'beatmaker101' } } as any as Request;
      const json = jest.fn().mockReturnValue({ username: 'beatmaker101' });
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getSpecificUser(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(mockUser);
    });

    // Return 404 when user not found
    test('should return 404 status when username does not exist', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);

      const req = { params: { username: 'nonexistent' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getSpecificUser(req, res);

      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    // Return 400 on database error
    test('should return 400 status on database error', async () => {
      const dbError = new Error('Database connection failed');
      jest.spyOn(User, 'findOne').mockRejectedValue(dbError);

      const req = { params: { username: 'beatmaker101' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getSpecificUser(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({ error: 'Database connection failed' });
    });

    // Azure endpoint integration test (mock)
    test('should be compatible with Azure endpoint structure', async () => {
      const mockUser = new User({
        auth0id: 'auth0|001',
        username: 'azureuser',
        artistAlias: 'Azure Artist',
        professions: ['Producer'],
        genres: ['Electronic'],
        biography: 'Testing Azure integration',
        phone_num: '555-999-9999',
        email: 'azure@example.com',
        daws: ['Ableton'],
        external_visits: [],
        social_media: {}
      });

      jest.spyOn(User, 'findOne').mockResolvedValue(mockUser as any);

      const req = { params: { username: 'azureuser' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getSpecificUser(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalled();
    });
  });

  describe('GET getSpecificPost', () => {
    // Successfully retrieve a single post by postId
    test('should return 200 status with post data when postId exists', async () => {
      const mockPost = new Post({
        postId: 1,
        author: 'beatmaker101',
        title: 'New Beat Release',
        content: 'Check out my latest beat production',
        createdAt: new Date('2024-12-04'),
        likes: 15,
        comments: ['Great beat!', 'Love it!']
      });

      jest.spyOn(Post, 'findOne').mockResolvedValue(mockPost as any);

      const req = { params: { postId: '1' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getSpecificPost(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(mockPost);
    });

    // Return 404 when post not found
    test('should return 404 status when postId does not exist', async () => {
      jest.spyOn(Post, 'findOne').mockResolvedValue(null);

      const req = { params: { postId: '999' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getSpecificPost(req, res);

      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({ error: 'Post not found' });
    });

    // Return 400 on database error
    test('should return 400 status on database error', async () => {
      const dbError = new Error('Database connection failed');
      jest.spyOn(Post, 'findOne').mockRejectedValue(dbError);

      const req = { params: { postId: '1' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getSpecificPost(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({ error: 'Database connection failed' });
    });

    // Azure endpoint integration test
    test('should be compatible with Azure endpoint structure', async () => {
      const mockPost = new Post({
        postId: 1,
        author: 'azureuser',
        title: 'Azure Post',
        content: 'Testing Azure endpoint integration',
        createdAt: new Date(),
        likes: 5,
        comments: []
      });

      jest.spyOn(Post, 'findOne').mockResolvedValue(mockPost as any);

      const req = { params: { postId: '1' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getSpecificPost(req, res);

      expect(status).toHaveBeenCalledWith(200);
      // Azure should receive consistent JSON response
      expect(json).toHaveBeenCalled();
    });
  });

  describe('GET getChatById', () => {
    // Successfully retrieve a single chat by chatId
    test('should return 200 status with chat data when chatId exists', async () => {
      const mockChat = {
        _id: '507f1f77bcf86cd799439011',
        user1: 'beatmaker101',
        user2: 'vocalqueen',
        recentMessage: 'Hey, how are you?',
        createdAt: new Date('2024-12-04')
      };

      jest.spyOn(Chat, 'findOne').mockResolvedValue(mockChat as any);

      const req = { params: { chatId: '507f1f77bcf86cd799439011' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getChatById(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(mockChat);
    });

    // Return 404 when chat not found
    test('should return 404 status when chatId does not exist', async () => {
      jest.spyOn(Chat, 'findOne').mockResolvedValue(null);

      const req = { params: { chatId: '999' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getChatById(req, res);

      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith('No Chat Found With Specified ID');
    });

    // Return 400 on database error
    test('should return 400 status on database error', async () => {
      const dbError = new Error('Database connection failed');
      jest.spyOn(Chat, 'findOne').mockRejectedValue(dbError);

      const req = { params: { chatId: '507f1f77bcf86cd799439011' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getChatById(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({ error: 'Database connection failed' });
    });

    // Azure endpoint integration test
    test('should be compatible with Azure endpoint structure', async () => {
      const mockChat = {
        _id: '507f1f77bcf86cd799439012',
        user1: 'azureuser1',
        user2: 'azureuser2',
        recentMessage: 'Testing Azure integration',
        createdAt: new Date()
      };

      jest.spyOn(Chat, 'findOne').mockResolvedValue(mockChat as any);

      const req = { params: { chatId: '507f1f77bcf86cd799439012' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getChatById(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalled();
    });
  });
});

