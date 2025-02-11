export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001"
    : "https://server-rental-app.vercel.app";
