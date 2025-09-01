import { Session } from "next-auth";

export function getApiKey() {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API key is undefined");
  return apiKey;
}

export function getBackendUrl() {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) throw new Error("Backend URL is undefined");
  return backendUrl;
}

export function getFrontendUrl() {
  const frontendUrl = process.env.FRONTEND_URL;
  if (!frontendUrl) throw new Error("Frontend URL is undefined");
  return frontendUrl;
}

export function getUserId(session: Session | null) {
  const userId = session?.user?.id;
  if (!userId) throw new Error("User ID is undefined");
  return userId;
}
