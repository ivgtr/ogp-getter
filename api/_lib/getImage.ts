import axios from "axios";
import { parse } from "node-html-parser";

type OgpData = {
  image?: string;
};

export const getImage = async (url: string) => {
  const resp = await axios.get(url, { headers: { "User-Agent": "Twitterbot/1.0" } }).catch(() => {
    throw new Error("URLが不正です");
  });
  const body = resp.data;
  const root = parse(body);
  const metaData = root.querySelectorAll("meta");
  const ogpData: OgpData = metaData.reduce((acc: OgpData, meta) => {
    const prop = meta.getAttribute("property");
    if (prop === "og:image") {
      const content = meta.getAttribute("content");

      acc.image = content;
    }
    return acc;
  }, {});

  if (!ogpData.image) throw new Error("og:imageが見つかりませんでした");

  const { buffer, type } = await axios
    .get(ogpData.image, { responseType: "arraybuffer" })
    .then((response) => {
      return {
        buffer: response.data,
        type: response.headers["content-type"].split("/")[1],
      };
    });

  return { url: ogpData.image, type, buffer };
};
