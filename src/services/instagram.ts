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
}

/**
 * Asynchronously retrieves the latest Instagram posts.
 *
 * @returns A promise that resolves to an array of InstagramPost objects.
 */
export async function getInstagramFeed(): Promise<InstagramPost[]> {
  // TODO: Implement this by calling the Instagram API.

  return [
    {
      id: '1',
      url: 'https://www.instagram.com/galwaydodgeball/',
      caption: 'Galway Dodgeball is back!',
      imageUrl: 'https://www.instagram.com/galwaydodgeball/image1.jpg',
    },
    {
      id: '2',
      url: 'https://www.instagram.com/galwaydodgeball/',
      caption: 'Join us for a fun game of dodgeball!',
      imageUrl: 'https://www.instagram.com/galwaydodgeball/image2.jpg',
    },
  ];
}
