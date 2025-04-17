
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Join our WhatsApp community group for the latest updates and to connect with other players:
          </p>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-primary mb-4 block">
            Join WhatsApp Community
          </a>
          <p className="mb-4">
            <strong>Address:</strong>
            {/* Add location and map here - consider using an iframe for Google Maps */}
            <br />
            [Your Location Here]
          </p>
          <p>
            <strong>Timing:</strong>
            <br />
            Every Tuesday, 7:30 PM to 9:00 PM
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
