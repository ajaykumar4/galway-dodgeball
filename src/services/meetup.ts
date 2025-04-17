/**
 * Represents a Meetup event.
 */
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
 * Asynchronously retrieves upcoming Meetup events.
 *
 * @returns A promise that resolves to an array of MeetupEvent objects.
 */
export async function getUpcomingEvents(): Promise<MeetupEvent[]> {
  // TODO: Implement this by calling the Meetup API.

  return [
    {
      id: '1',
      name: 'Galway Dodgeball Meetup',
      url: 'https://www.meetup.com/galway-dodgeball/',
      description: 'Join us for a fun game of dodgeball!',
      time: 'Tuesday, 7:30 PM - 9:00 PM',
    },
    {
      id: '2',
      name: 'Galway Dodgeball Social',
      url: 'https://www.meetup.com/galway-dodgeball/',
      description: 'Join us for a social event after dodgeball!',
      time: 'Tuesday, 9:00 PM - 10:00 PM',
    },
  ];
}
