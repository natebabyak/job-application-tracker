import { getApiKey, getUserId } from "./utils";

export const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      "X-Api-Key": getApiKey(),
      "X-User-Id": getUserId(),
    },
  }).then((r) => r.json());
