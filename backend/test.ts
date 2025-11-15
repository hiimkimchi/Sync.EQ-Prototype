import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user";
import fs from "fs";
import Post from "./models/post";

//Use npx tsx test.ts to run this file

dotenv.config();

const users = [
  {
    auth0id: "auth0|001",
    username: "beatmaker101",
    artistAlias: "BeatMaster",
    professions: ["Producer", "DJ"],
    genres: ["Hip-Hop", "Trap"],
    biography: "Creating beats since 2015, passionate about hip-hop.",
    phone_num: "555-123-4567",
    email: "beatmaster@example.com",
    daws: ["FL Studio", "Ableton Live"],
    external_visits: ["https://soundcloud.com/beatmaster"],
    social_media: { instagram: "beatmaster_insta", twitter: "beatmaster_tw" }
  },
  {
    auth0id: "auth0|002",
    username: "vocalqueen",
    artistAlias: "VocalQueen",
    professions: ["Singer", "Songwriter"],
    genres: ["Pop", "R&B"],
    biography: "Singer and songwriter, blending pop with soulful melodies.",
    phone_num: "555-234-5678",
    email: "vocalqueen@example.com",
    daws: ["Logic Pro X"],
    external_visits: ["https://www.youtube.com/vocalqueen"],
    social_media: { instagram: "vocalqueen_insta" }
  },
  {
    auth0id: "auth0|003",
    username: "guitarhero",
    artistAlias: "StrumKing",
    professions: ["Guitarist", "Composer"],
    genres: ["Rock", "Blues"],
    biography: "Rock guitarist and composer performing live since 2010.",
    phone_num: "555-345-6789",
    email: "strumking@example.com",
    daws: ["Pro Tools"],
    external_visits: [],
    social_media: { twitter: "strumking_tw" }
  },
  {
    auth0id: "auth0|004",
    username: "djflux",
    artistAlias: "DJ Flux",
    professions: ["DJ", "Producer"],
    genres: ["Electronic", "House"],
    biography: "DJ performing at clubs worldwide, electronic music lover.",
    phone_num: "555-456-7890",
    email: "djflux@example.com",
    daws: ["Ableton Live"],
    external_visits: ["https://mixcloud.com/djflux"],
    social_media: { instagram: "djflux_insta", soundcloud: "djflux_sc" }
  },
  {
    auth0id: "auth0|005",
    username: "pianogenius",
    artistAlias: "KeyMaster",
    professions: ["Pianist", "Composer"],
    genres: ["Classical", "Jazz"],
    biography: "Composing classical and jazz pieces for over 15 years.",
    phone_num: "555-567-8901",
    email: "keymaster@example.com",
    daws: [],
    external_visits: [],
    social_media: {}
  },
  {
    auth0id: "auth0|006",
    username: "lyricist99",
    artistAlias: "WordSmith",
    professions: ["Songwriter", "Poet"],
    genres: ["Rap", "Hip-Hop"],
    biography: "Crafting meaningful lyrics and rhymes every day.",
    phone_num: "555-678-9012",
    email: "wordsmith@example.com",
    daws: ["FL Studio"],
    external_visits: ["https://www.medium.com/@wordsmith"],
    social_media: { instagram: "wordsmith_insta" }
  },
  {
    auth0id: "auth0|007",
    username: "drumking",
    artistAlias: "BeatDrummer",
    professions: ["Drummer", "Producer"],
    genres: ["Rock", "Funk"],
    biography: "Drummer and producer passionate about rhythm.",
    phone_num: "555-789-0123",
    email: "beatdrummer@example.com",
    daws: ["Logic Pro X"],
    external_visits: [],
    social_media: { twitter: "beatdrummer_tw" }
  },
  {
    auth0id: "auth0|008",
    username: "synthwiz",
    artistAlias: "SynthMaster",
    professions: ["Producer", "Sound Designer"],
    genres: ["Electronic", "Synthwave"],
    biography: "Designing unique sounds for synthwave and electronic tracks.",
    phone_num: "555-890-1234",
    email: "synthmaster@example.com",
    daws: ["Ableton Live", "Reason"],
    external_visits: ["https://soundcloud.com/synthmaster"],
    social_media: { instagram: "synthmaster_insta" }
  },
  {
    auth0id: "auth0|009",
    username: "bassguru",
    artistAlias: "BassMaster",
    professions: ["Bassist", "Producer"],
    genres: ["Funk", "Jazz"],
    biography: "Bassist and producer, grooving through life.",
    phone_num: "555-901-2345",
    email: "bassmaster@example.com",
    daws: ["Pro Tools"],
    external_visits: [],
    social_media: {}
  },
  {
    auth0id: "auth0|010",
    username: "vocalnova",
    artistAlias: "NovaVoice",
    professions: ["Singer", "Songwriter"],
    genres: ["Pop", "Electronic"],
    biography: "Singing and writing for the stars.",
    phone_num: "555-012-3456",
    email: "novavoice@example.com",
    daws: ["Logic Pro X"],
    external_visits: ["https://youtube.com/novavoice"],
    social_media: { instagram: "novavoice_insta", tiktok: "novavoice_tt" }
  },
];

const posts = [
  {
    postId: 1,
    author: "beatmaker101",
    title: "New Trap Beat!",
    content: "Check out my latest trap beat, feedback welcome!",
    mediaID: null,
    likes_usernames: ["vocalqueen", "guitarhero"],
    reposts_usernames: ["djflux"]
  },
  {
    postId: 1,
    author: "vocalqueen",
    title: "Cover of Latest Pop Hit",
    content: "Here's my cover of the trending pop hit.",
    mediaID: null,
    likes_usernames: ["beatmaker101", "synthwiz"],
    reposts_usernames: []
  },
  {
    postId: 1,
    author: "guitarhero",
    title: "Rock Solo",
    content: "Recording a new guitar solo, any thoughts?",
    mediaID: null,
    likes_usernames: ["bassguru", "pianogenius"],
    reposts_usernames: ["lyricist99"]
  },
  {
    postId: 1,
    author: "djflux",
    title: "Electronic Mix",
    content: "Here's my latest electronic set.",
    mediaID: null,
    likes_usernames: ["synthwiz", "beatmaker101"],
    reposts_usernames: []
  },
  {
    postId: 1,
    author: "pianogenius",
    title: "Jazz Composition",
    content: "Sharing my newest jazz piece.",
    mediaID: null,
    likes_usernames: ["guitarhero", "bassguru"],
    reposts_usernames: []
  },
  {
    postId: 1,
    author: "lyricist99",
    title: "New Rap Lyrics",
    content: "Wrote some new bars, what do you think?",
    mediaID: null,
    likes_usernames: ["beatmaker101", "vocalqueen"],
    reposts_usernames: []
  },
  {
    postId: 1,
    author: "drumking",
    title: "Funky Drums",
    content: "A funky drum beat I just made.",
    mediaID: null,
    likes_usernames: ["bassguru", "synthwiz"],
    reposts_usernames: ["djflux"]
  },
  {
    postId: 1,
    author: "synthwiz",
    title: "Synthwave Track",
    content: "Latest synthwave track released.",
    mediaID: null,
    likes_usernames: ["djflux", "novavoice"],
    reposts_usernames: ["beatmaker101"]
  },
  {
    postId: 1,
    author: "bassguru",
    title: "Funky Bass Line",
    content: "Check out this bassline I recorded.",
    mediaID: null,
    likes_usernames: ["drumking", "guitarhero"],
    reposts_usernames: []
  },
  {
    postId: 1,
    author: "vocalnova",
    title: "Pop Vocal Experiment",
    content: "Trying some new vocal techniques.",
    mediaID: null,
    likes_usernames: ["vocalqueen", "synthwiz"],
    reposts_usernames: ["djflux"]
  },
];


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
		if (err instanceof Error)
			console.error("Error creating test user:", err.message);
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
			postId: 2,
			author: "badevera04",
			title: "New Single Out",
			content:
				"Dropped a new single — link in bio. Produced with analog synths and live drums.",
			mediaID: "s3://synceq-media/track-abc123.mp3",
			likes_usernames: ["jomi", "bryan", "alice"],
			reposts_usernames: ["D'Angelo"],
			createdAt: "2025-10-29T18:30:00.000Z",
			updatedAt: "2025-10-29T18:35:00.000Z",
		});

		// Save the test post to the database
		return await testPost.save();
		// If does throw error, prints error to console
	} catch (err: unknown) {
		if (err instanceof Error)
			console.error("Error creating test post:", err.message);
	} finally {
		await mongoose.disconnect();
	}
};

const updatepfps = async () => {
  try {
  // Get MongoDB connection URL from environment variables
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) throw new Error("MONGO_URL is not set in environment");

  await mongoose.connect(mongoUrl);
  console.log("Connected to MongoDB");
  const pfpurl = "https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2016/06/18002409/7d7bcf9c-636d-11f0-843a-0ee6b8365494-972x597.webp";
  const users = await User.updateMany(
    {profile_pic: {$exists: false}},
    {$set: {profile_pic: pfpurl}}
  );

  } catch (err: unknown) {
      if (err instanceof Error) console.error("Error creating test post:", err.message);
  } finally {
      await mongoose.disconnect();
  } 
}

		await mongoose.connect(mongoUrl);
		console.log("Connected to MongoDB");
    const resultUsers = await User.insertMany(users);
    console.log("users loaded");
    const resultPosts = await Post.insertMany(posts);
    console.log("posts loaded");
	} catch (err: unknown) {
		if (err instanceof Error)
			console.error("Error creating test post:", err.message);
	} finally {
		await mongoose.disconnect();
    console.log("disconnected from mongo")
	}  
}

// Call the functions to create test user and post
// createTestUser()
// createTestPost()
updatepfps();
