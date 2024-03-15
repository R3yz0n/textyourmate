// console.log(import.meta.env.VITE_API_URL);
// console.log(import.meta.env.MODE);
// export const BASE_URL =
//   import.meta.env.MODE === "development" ? "http://localhost:8000" : import.meta.env.VITE_API_URL;
export const BASE_URL = import.meta.env.VITE_API_URL;
console.log(BASE_URL);
export const USERS_URL = "/api/users";
export const MESSAGE_URL = "/api/message";
export const CONVERSATION_URL = "/api/conversation";
