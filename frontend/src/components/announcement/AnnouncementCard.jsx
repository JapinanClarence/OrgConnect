import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

const categoryMap = {
  0: { name: "General Info", color: "bg-blue-500" },
  1: { name: "Meetings", color: "bg-green-600" },
  2: { name: "Reminders", color: "bg-yellow-500" },
  3: { name: "News", color: "bg-purple-500" },
  4: { name: "Alerts", color: "bg-red-500" },
};

const AnnouncementCard = ({
  id,
  title,
  description,
  datePosted,
  category,
  onDelete,
  onClick,
}) => {
  const [badgeCategory, setBadgeCategory] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = (event) => {
    event.stopPropagation();
    setShowAlert(true); // Show the delete confirmation dialog
  };

  const confirmDelete = () => {
    onDelete(id); // Call the delete function
    setShowAlert(false); // Close the alert dialog after deleting
  };

  const cancelDelete = () => {
    setShowAlert(false); // Close the alert dialog without deleting
  };

  const handleClick = () => {
    onClick({ id, title, description, category, datePosted });
  };

  useEffect(() => {
    // Set badge details based on the category
    if (categoryMap[category]) {
      setBadgeCategory(categoryMap[category]);
    }
  }, [category]);

  return (
    <>
      <Card className="shadow-sm border-zinc-300" onClick={handleClick}>
        <CardContent className="p-3 md:p-5 relative">
          <div className="absolute top-1 right-1 p-0 m-0 z-20">
            <Button
              className="h-[20px] w-[20px] p-0 rounded-full m-0 hover:bg-zinc-100"
              variant="ghost"
              onClick={handleDelete}
            >
              <X className="text-zinc-500 h-[13px]" />
            </Button>
          </div>
          <CardHeader className="flex text-xs flex-col md:flex-row p-0">
            <span className="font-bold text-xs mr-2">Posted on:</span>
            {datePosted}
          </CardHeader>

          <CardTitle className="text-md">
            {title}
            {badgeCategory && (
              <Badge
                className={`ml-2 hidden md:inline ${badgeCategory.color} text-white hover:${badgeCategory.color}`}
              >
                {badgeCategory.name}
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="text-pretty md:text-wrap overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
            {description.length > 50
              ? `${description.slice(0, 100)}...`
              : description}
          </CardDescription>
          <CardFooter className="inline md:hidden p-0">
            {badgeCategory && (
              <Badge className={`${badgeCategory.color} text-white`}>
                {badgeCategory.name}
              </Badge>
            )}
          </CardFooter>
        </CardContent>
      </Card>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              announcement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AnnouncementCard;
