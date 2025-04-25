/**
 * Represents a Meetup event.
 */
import { getCachedData, setCachedData } from './redis';

const MEETUP_CACHE_KEY = 'meetup_events';
const CACHE_EXPIRY_SECONDS = 3600; // 1 hour

export interface MeetupEvent {
  /**
   * The ID of the event.
   */
  id: string;
  /**
   * The name of the event.
   */
  name: string;
  /**
   * The URL of the event.
   */
  url: string;
  /**
   * The description of the event.
   */
  description: string;
  /**
   * The time of the event.
   */
  time: string;
}

/**
 * Asynchronously retrieves upcoming Meetup events using the Meetup GraphQL API.
 *
 * @returns A promise that resolves to an array of MeetupEvent objects.
 */
export async function getUpcomingEvents(): Promise<MeetupEvent[]> {
    const cachedData = await getCachedData(MEETUP_CACHE_KEY);
    if (cachedData) {
      console.log('Using cached Meetup data');
      return JSON.parse(cachedData);
    }
  const apiKey = process.env.MEETUP_API_KEY;
  const groupId = process.env.MEETUP_GROUP_ID;

  if (!apiKey || !groupId) {
    console.error("Meetup API key or group ID not found in environment variables.");
    return [];
  }

  const graphqlQuery = {
    query: `
      query {
        groupByUrlname(urlname: "${groupId}") {
          name
          id
          events(input: { first: 4, status: UPCOMING }) {
            count
            edges {
              node {
                id
                title
                description
                eventUrl
                dateTime
              }
            }
          }
        }
      }
    `,
  };

  try {
    const response = await fetch("https://api.meetup.com/gql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(graphqlQuery),
    });

    if (!response.ok) {
        console.error(`Meetup API request failed with status: ${response.status}`);
        return [];
    }

    // Wrap the JSON parsing in a try-catch block to handle parsing errors
    try {
      const data = await response.json();

      if (!data.data || !data.data.groupByUrlname || !data.data.groupByUrlname.events) {
        console.error("Failed to fetch events from Meetup API", data);
        return [];
      }

      const eventsData = data.data.groupByUrlname.events.edges;

      const events: MeetupEvent[] = eventsData.map((event: any) => {
        return {
          id: event.node.id,
          name: event.node.title,
          url: event.node.eventUrl,
          description: event.node.description,
          time: new Date(event.node.dateTime).toLocaleString(), // Format the date and time
        };
      });
        await setCachedData(MEETUP_CACHE_KEY, JSON.stringify(events), CACHE_EXPIRY_SECONDS);
      return events;
    } catch (jsonError) {
      console.error("Error parsing JSON response from Meetup API:", jsonError);
      return [];
    }
  } catch (error) {
    console.error("Error fetching Meetup events:", error);
    return [];
  }
}
