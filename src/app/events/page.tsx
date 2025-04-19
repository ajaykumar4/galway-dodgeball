import {getUpcomingEvents} from '@/services/meetup';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  return (
    
      
        
      
      
        
          
            Upcoming Events
          
          
            Stay updated on our latest dodgeball events.
          
        
        
          
            {events && events.length > 0 ? (
              events.map(event => (
                
                  
                    
                      {event.name}
                    
                  
                  
                    
                      {event.time}
                      {event.description}
                      Learn More
                    
                  
                
              ))
            ) : (
              
                No upcoming events found. Please check our{' '}
                
                  Meetup page
                {' '}
                for more details.
              
            )}
          
        
      
    
  );
}

