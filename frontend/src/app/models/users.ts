export interface SocialMediaLink {
  platform: string;
  url: string;
}

export interface User {
    _id: string;
    professions: string[];
    artist_name: string;
    username: string;
    genres: string[]; 
    biography: string;
    phone_num: string;
    email: string;

    daws?: string[];
    external_visits?: string[];
    profile_pic?: string | ArrayBuffer | null; // Buffer from Mongo returned as base64/string on HTTP
    social_media?: SocialMediaLink[];
}
