import User from '../models/user';
import { getUsers } from '../controllers/userController.js';
import { getAllPosts, getUsersPosts } from '../controllers/postController.js';
import { Request, Response } from 'express';
import Post from '../models/post.js';
import Chat from '../models/chat.js';
import { getAllChats, getSpecificUsersChats } from '../controllers/chatController.js';

describe('GET List requests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET user lists', () => {
    // Successfully retrieve list of all users
    test('should return 200 status with array of users when users exist', async () => {
      const mockUsers = [
        new User({
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
          social_media: { instagram: 'beatmaster_insta' }
        }),
        new User({
          auth0id: 'auth0|002',
          username: 'vocalqueen',
          artistAlias: 'VocalQueen',
          professions: ['Singer', 'Songwriter'],
          genres: ['Pop', 'R&B'],
          biography: 'Singer and songwriter',
          phone_num: '555-234-5678',
          email: 'vocalqueen@example.com',
          daws: ['Logic Pro X'],
          external_visits: [],
          social_media: {}
        })
      ];

      jest.spyOn(User, 'find').mockResolvedValue(mockUsers as any[]);

      const req = {} as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getUsers(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(mockUsers);
    });

    // Return 404 when no users found
    test('should return 404 status when no users exist in database', async () => {
      jest.spyOn(User, 'find').mockResolvedValue([]);

      const req = {} as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getUsers(req, res);

      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({ error: 'No users in db' });
    });

    // Return 400 on database error
    test('should return 400 status on database error', async () => {
      const dbError = new Error('Connection timeout');
      jest.spyOn(User, 'find').mockRejectedValue(dbError);

      const req = {} as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getUsers(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({ error: 'Connection timeout' });
    });

    // Verify response is array of user objects
    test('should return array with correct user structure', async () => {
      const mockUsers = [
        {
          _id: '507f1f77bcf86cd799439011',
          auth0id: 'auth0|001',
          username: 'beatmaker101',
          artistAlias: 'BeatMaster',
          professions: ['Producer'],
          genres: ['Hip-Hop'],
          biography: 'Creating beats',
          phone_num: '555-123-4567',
          email: 'beatmaster@example.com',
          daws: ['FL Studio'],
          external_visits: [],
          profile_pic: 'base64string',
          social_media: { instagram: 'handle' }
        }
      ];

      jest.spyOn(User, 'find').mockResolvedValue(mockUsers as any[]);

      const req = {} as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getUsers(req, res);

      const result = (json as jest.Mock).mock.calls[0][0];
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      expect(result[0]).toHaveProperty('username', 'beatmaker101');
      expect(result[0]).toHaveProperty('email', 'beatmaster@example.com');
    });

    // Azure endpoint integration test
    test('should be compatible with Azure endpoint for list retrieval', async () => {
      const mockUsers = [
        {
          _id: '507f1f77bcf86cd799439011',
          auth0id: 'auth0|azure001',
          username: 'azureuser1',
          artistAlias: 'Azure Artist',
          professions: ['Producer'],
          genres: ['Electronic'],
          biography: 'Azure test user',
          phone_num: '555-999-9999',
          email: 'azure1@example.com',
          daws: ['Ableton'],
          external_visits: [],
          profile_pic: '',
          social_media: {}
        }
      ];

      jest.spyOn(User, 'find').mockResolvedValue(mockUsers as any[]);

      const req = {} as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getUsers(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalled();
      // Azure receives consistent JSON array
      const result = (json as jest.Mock).mock.calls[0][0];
      expect(Array.isArray(result)).toBe(true);
    });
});

  describe('GET getAllPosts', () => {
    // Successfully retrieve all posts
    test('should return 200 status with posts array', async () => {
      const mockPosts = [
        {
          postId: 1,
          author: 'beatmaker101',
          title: 'New Beat Release',
          content: 'Check out my latest beat',
          createdAt: new Date('2024-12-04'),
          likes: 5,
          comments: []
        },
        {
          postId: 2,
          author: 'vocalqueen',
          title: 'Vocal Tips',
          content: 'Improve your vocal technique',
          createdAt: new Date('2024-12-03'),
          likes: 10,
          comments: []
        }
      ];

      jest.spyOn(Post, 'find').mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(mockPosts)
        })
      } as any);

      const req = {} as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getAllPosts(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(mockPosts);
    });

    // Return 404 when no posts exist
    test('should return 404 status when no posts exist', async () => {
      jest.spyOn(Post, 'find').mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([])
        })
      } as any);

      const req = {} as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getAllPosts(req, res);

      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({ error: 'No posts exist on Sync.EQ' });
    });

    // Return 400 on database error
    test('should return 400 status on database error', async () => {
      const dbError = new Error('Database connection failed');
      jest.spyOn(Post, 'find').mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockRejectedValue(dbError)
        })
      } as any);

      const req = {} as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getAllPosts(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({ error: 'Database connection failed' });
    });
    });


  describe('GET getUsersPosts', () => {
    // Successfully retrieve user's posts
    test('should return 200 status with user posts array', async () => {
      const mockPosts = [
        {
          postId: 1,
          author: 'beatmaker101',
          title: 'First Beat',
          content: 'My first beat release',
          createdAt: new Date(),
          likes: 5,
          comments: []
        },
        {
          postId: 2,
          author: 'beatmaker101',
          title: 'Second Beat',
          content: 'Second beat release',
          createdAt: new Date(),
          likes: 3,
          comments: []
        }
      ];

      jest.spyOn(Post, 'find').mockResolvedValue(mockPosts as any[]);

      const req = { params: { username: 'beatmaker101' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getUsersPosts(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(mockPosts);
    });

    // Return 404 when user has no posts
    test('should return 404 status when user has no posts', async () => {
      jest.spyOn(Post, 'find').mockResolvedValue([]);

      const req = { params: { username: 'newuser' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getUsersPosts(req, res);

      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({ error: 'No posts found with associated user' });
    });

    // Return 400 on database error
    test('should return 400 status on database error', async () => {
      const dbError = new Error('Query failed');
      jest.spyOn(Post, 'find').mockRejectedValue(dbError);

      const req = { params: { username: 'beatmaker101' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getUsersPosts(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({ error: 'Query failed' });
    });

    // Azure endpoint integration test
    test('should be compatible with Azure endpoint for user posts', async () => {
      const mockPosts = [
        {
          _id: '507f1f77bcf86cd799439011',
          postId: 1,
          author: 'azureuser',
          title: 'Azure Post',
          content: 'Testing Azure integration',
          createdAt: new Date(),
          likes: 2,
          comments: []
        }
      ];

      jest.spyOn(Post, 'find').mockResolvedValue(mockPosts as any[]);

      const req = { params: { username: 'azureuser' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getUsersPosts(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalled();
    });
  });

  describe('GET getAllChats', () => {
    // Successfully retrieve all chats
    test('should return 200 status with chats array when chats exist', async () => {
      const mockChats = [
        {
          _id: '607f1f77bcf86cd799439011',
          user1: 'beatmaker101',
          user2: 'vocalqueen',
          recentMessage: {
            sender: 'beatmaker101',
            content: 'Hey, love your vocals!',
            timestamp: new Date()
          }
        },
        {
          _id: '607f1f77bcf86cd799439012',
          user1: 'guitarhero',
          user2: 'djflux',
          recentMessage: {
            sender: 'djflux',
            content: 'Your guitar skills are amazing',
            timestamp: new Date()
          }
        }
      ];

      jest.spyOn(Chat, 'find').mockResolvedValue(mockChats as any[]);

      const req = {} as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getAllChats(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(mockChats);
    });

    // Return 404 when no chats exist
    test('should return 404 status when no chats exist in database', async () => {
      jest.spyOn(Chat, 'find').mockResolvedValue([]);

      const req = {} as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getAllChats(req, res);

      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({ error: 'No Chats Found In DB' });
    });

    // Return 400 on database error
    test('should return 400 status on database error', async () => {
      const dbError = new Error('Database connection failed');
      jest.spyOn(Chat, 'find').mockRejectedValue(dbError);

      const req = {} as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getAllChats(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({ error: 'Database connection failed' });
    });

    // Verify response is array of chat objects
    test('should return array with chat', async () => {
      const mockChats = [
        {
          _id: '607f1f77bcf86cd799439011',
          user1: 'beatmaker101',
          user2: 'vocalqueen',
          recentMessage: {
            sender: 'beatmaker101',
            content: 'Hello',
            timestamp: new Date()
          }
        }
      ];

      jest.spyOn(Chat, 'find').mockResolvedValue(mockChats as any[]);

      const req = {} as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getAllChats(req, res);

      const result = (json as jest.Mock).mock.calls[0][0];
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      expect(result[0]).toHaveProperty('user1', 'beatmaker101');
      expect(result[0]).toHaveProperty('user2', 'vocalqueen');
    });

    // Azure endpoint integration test
    test('should be compatible with Azure endpoint for chats retrieval', async () => {
      const mockChats = [
        {
          _id: '607f1f77bcf86cd799439011',
          user1: 'azureuser1',
          user2: 'azureuser2',
          recentMessage: {
            sender: 'azureuser1',
            content: 'Azure chat test',
            timestamp: new Date()
          }
        }
      ];

      jest.spyOn(Chat, 'find').mockResolvedValue(mockChats as any[]);

      const req = {} as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getAllChats(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalled();
      const result = (json as jest.Mock).mock.calls[0][0];
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('GET getSpecificUsersChats', () => {
    // Successfully retrieve user's chats
    test('should return 200 status with user chats array', async () => {
      const mockChats = [
        {
          _id: '607f1f77bcf86cd799439011',
          user1: 'beatmaker101',
          user2: 'vocalqueen',
          recentMessage: {
            sender: 'beatmaker101',
            content: 'Love your voice!',
            timestamp: new Date()
          }
        },
        {
          _id: '607f1f77bcf86cd799439012',
          user1: 'guitarhero',
          user2: 'beatmaker101',
          recentMessage: {
            sender: 'guitarhero',
            content: 'Your beats are fire',
            timestamp: new Date()
          }
        }
      ];

      jest.spyOn(Chat, 'find').mockResolvedValue(mockChats as any[]);

      const req = { params: { username: 'beatmaker101' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getSpecificUsersChats(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(mockChats);
    });

    //  Return 404 when user has no chats
    test('should return 404 status when user has no chats', async () => {
      jest.spyOn(Chat, 'find').mockResolvedValue([]);

      const req = { params: { username: 'newuser' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getSpecificUsersChats(req, res);

      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({ error: 'No chats for specific user found' });
    });

    // Return 400 on database error
    test('should return 400 status on database error', async () => {
      const dbError = new Error('Query failed');
      jest.spyOn(Chat, 'find').mockRejectedValue(dbError);

      const req = { params: { username: 'beatmaker101' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getSpecificUsersChats(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({ error: 'Query failed' });
    });

    // Azure endpoint integration test
    test('should be compatible with Azure endpoint for user chats', async () => {
      const mockChats = [
        {
          _id: '607f1f77bcf86cd799439011',
          user1: 'azureuser1',
          user2: 'azureuser2',
          recentMessage: {
            sender: 'azureuser1',
            content: 'Azure chat test',
            timestamp: new Date()
          }
        }
      ];

      jest.spyOn(Chat, 'find').mockResolvedValue(mockChats as any[]);

      const req = { params: { username: 'azureuser1' } } as any as Request;
      const json = jest.fn();
      const status = jest.fn(() => ({ json })) as any as Response['status'];
      const res = { status } as any as Response;

      await getSpecificUsersChats(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalled();
    });
  });
});
