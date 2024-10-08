import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AnnouncementCard = ({ id, title, description, datePosted }) => {
  return (
    <Card className="shadow-sm border-zinc-300">
      <CardContent className="p-5">
        <CardHeader className="flex text-xs flex-row p-0">
          <span className="font-bold text-xs mr-2">Posted on:</span>{datePosted}
        </CardHeader>

        <CardTitle className="text-md">{title}</CardTitle>
        <CardDescription className="text-pretty md:text-wrap">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
