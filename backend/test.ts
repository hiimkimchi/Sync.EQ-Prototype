import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user";
import fs from "fs";
import Post from "./models/post";

//Use npx tsx test.ts to run this file

dotenv.config();

// Function to create and save a test user
const createTestUser = async () => {
  try {
    // Connect to MongoDB
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) throw new Error("MONGO_URL is not set in environment");

    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");

    const pfp = fs.readFileSync("../frontend/src/assets/images/jomi.jpg");

    // Create a new test user
    const testUser = new User({
      auth0id: "auth0|abc4",
      username: "D'Angelo",
      artistAlias: "Michael Eugene Archer",
      profession: ["Producer"],
      genre: ["Hip Hop", "R&B"],
      biography: "Brown Sugar, babe, I gets high off your love",
      phone_num: "(123)456-7890",
      email: "dangelo@example.com",
      daws: ["FL Studio", "Live Stuff"],
      external_visits: [],
      profile_pic: pfp,
      social_media: {
        instagram: "https://instagram.com/xyz",
        twitter: "https://twitter.com/xyz",
        youtube: "https://youtube.com/xyz",
      },
    });

    // Save the test user to the database
    return await testUser.save();
    // If does throw error, prints error to console
  } catch (err: unknown) {
    if (err instanceof Error) console.error("Error creating test user:", err.message);
  } finally {
    await mongoose.disconnect();
  }
};


// Function to create and save a test post
const createTestPost = async () => {
  try {
    // Get MongoDB connection URL from environment variables
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) throw new Error("MONGO_URL is not set in environment");

    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");

    // Create a new test post
    const testPost = new Post({
      "postId": 2,
      "author": "badevera04",
      "title": "New Single Out",
      "content": "Dropped a new single — link in bio. Produced with analog synths and live drums.",
      "mediaID": "s3://synceq-media/track-abc123.mp3",
      "likes_usernames": ["jomi", "bryan", "alice"],
      "reposts_usernames": ["D'Angelo"],
      "createdAt": "2025-10-29T18:30:00.000Z",
      "updatedAt": "2025-10-29T18:35:00.000Z"
    });

    // Save the test post to the database
    return await testPost.save();
    // If does throw error, prints error to console
    } catch (err: unknown) {
        if (err instanceof Error) console.error("Error creating test post:", err.message);
    } finally {
        await mongoose.disconnect();
    }
};



// Call the functions to create test user and post
createTestUser()
createTestPost()
