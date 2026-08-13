import { generateNanoId } from "../utils/helper.js"
import urlSchema from "../models/short_url.model.js"
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js"
import { ConflictError } from "../utils/errorHandler.js"

const createGeneratedShortUrl = async (url, userId) => {
  // A generated nanoid collision is exceptionally unlikely, but never expose it
  // to a visitor as a failed link creation. Retry with a new code instead.
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const shortUrl = generateNanoId(7);
    if (await getCustomShortUrl(shortUrl)) continue;

    try {
      await saveShortUrl(shortUrl, url, userId);
      return shortUrl;
    } catch (error) {
      if (error?.statusCode !== 409) throw error;
    }
  }

  throw new Error("Unable to generate a unique short URL. Please try again.");
};

export const createShortUrlWithoutUser = async (url) => {
    return createGeneratedShortUrl(url)
}

export const createShortUrlWithUser = async (url, userId, slug = null) => {
  const cleanSlug = slug?.trim().toLowerCase();

  if (cleanSlug) {
    const exists = await getCustomShortUrl(cleanSlug);

    if (exists) {
      throw new ConflictError("That custom alias is already in use. Choose another one.");
    }

    await saveShortUrl(cleanSlug, url, userId);
    return cleanSlug;
  }

  return createGeneratedShortUrl(url, userId);
};
