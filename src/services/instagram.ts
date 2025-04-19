'use server';

/**
 * Represents an Instagram post.
 */
export interface InstagramPost {
  /**
   * The ID of the post.
   */
  id: string;
  /**
   * The URL of the post.
   */
  url: string;
  /**
   * The caption of the post.
   */
  caption: string;
  /**
   * The URL of the image.
   */
  imageUrl: string;
    /**
   * The HTML for embedding the Instagram post.
   */
  embedHtml: string;
}

/**
 * Asynchronously retrieves the latest Instagram posts.
 *
 * @returns A promise that resolves to an array of InstagramPost objects.
 */
export async function getInstagramFeed(): Promise<InstagramPost[]> {
  const accessToken = process.env.META_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;

  if (!accessToken || !accountId) {
    console.error("Meta access token or Instagram account ID not found in environment variables.");
    return [];
  }

  const limit = 6; // Number of posts to retrieve
  const apiUrl = `https://graph.facebook.com/v22.0/${accountId}/media?fields=id,caption,permalink,media_url,media_type&limit=${limit}&access_token=${accessToken}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.data) {
      console.error("Failed to fetch Instagram media:", data);
      return [];
    }

    const posts: InstagramPost[] = [];

    for (const media of data.data) {
      try {
        const embedResponse = await fetch(`https://graph.facebook.com/v22.0/instagram_oembed?url=${media.permalink}&access_token=${accessToken}`);
        const embedData = await embedResponse.json();

        if (embedData.html) {
          posts.push({
            id: media.id,
            url: media.permalink,
            caption: media.caption || '',
            imageUrl: media.media_url || '',
            embedHtml: embedData.html,
          });
        } else {
          console.error("Failed to fetch embed HTML for post ID:", media.id, embedData);
        }
      } catch (embedError) {
        console.error("Error fetching embed HTML for post ID:", media.id, embedError);
      }
    }

    return posts;
  } catch (error) {
    console.error("Error fetching Instagram feed:", error);
    return [];
  }
}
