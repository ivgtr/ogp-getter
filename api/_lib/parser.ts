import { VercelRequestQuery } from "@vercel/node";

export type Options = {
  url: string;
};

export type RequestQueryOptions = {
  url: string;
};

export const parseRequest = (query: VercelRequestQuery & RequestQueryOptions) => {
  const { url } = query;

  if (!url) throw new Error("URLが見つかりませんでした");

  return { url };
};
