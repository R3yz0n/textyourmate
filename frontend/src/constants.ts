export const BASE_URL = "http://localhost:8000";
export const USERS_URL = process.env.NODE_ENV === "development" ? "/api/users" : "";
export const MESSAGE_URL = process.env.NODE_ENV === "development" ? "/api/message" : "";
export const CONVERSATION_URL = process.env.NODE_ENV === "development" ? "/api/conversation" : "";
