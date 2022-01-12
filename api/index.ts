import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getImage } from "./_lib/getImage";
import { Options, parseRequest } from "./_lib/parser";

const CACHE_MAX_AGE = 60 * 60 * 24;

export default async (request: VercelRequest & { query: Options }, response: VercelResponse) => {
  try {
    const { url } = parseRequest(request.query);
    const image = await getImage(url);

    response.status(200);
    // return response.end();
    response.setHeader("Content-Type", `image/${image.type}`);
    response.setHeader("Cache-Control", `public, max-age=${CACHE_MAX_AGE}, stale-while-revalidate`);
    return response.end(image.buffer);
  } catch {
    response.writeHead(404);
    return response.end();
  }
};
