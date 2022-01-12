import { VercelRequestQuery } from "@vercel/node";

export type Options = {
  url: string;
};

export type RequestQueryOptions = {
  url: string;
};

export const parseRequest = (query: VercelRequestQuery & RequestQueryOptions) => {
  const { url } = query;

  return { url };
};