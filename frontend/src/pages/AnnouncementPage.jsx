import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import AnnouncementCard from "@/components/announcement/AnnouncementCard";
import apiClient from "@/api/axios";
import { formatDate } from "@/util/helpers";
import AddAnnouncementDialog from "@/components/announcement/AddAnnouncementDialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnnouncementSchema } from "@/schema";
import { useToast } from "@/hooks/use-toast";
import AnnouncementDetails from "@/components/announcement/AnnouncementDetails";
import EditAnnouncementDialog from "@/components/announcement/EditAnnouncementDialog";

const AnnouncementPage = () => {
  const [announcements, setAnnouncement] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("5"); // Default to "All" category (5)
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showAnnouncementDetails, setShowAnnouncementDetails] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { toast } = useToast();
  const date = formatDate(Date.now());

  const [visibleCount, setVisibleCount] = useState(10);

  const form = useForm({
    resolver: zodResolver(AnnouncementSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    filterAnnouncementsByCategory();
  }, [announcements, selectedCategory]);

  const fetchAnnouncements = async () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    try {
      const { data } = await apiClient.get("/admin/announcement", {
        headers: {
          Authorization: user.token,
        },
      });

      if (!data.success) {
        setAnnouncement([]);
      } else {
        setAnnouncement(data.data);
      }

      setLoading(false);
    } catch (error) {
      console.log(error.response.message);
      setLoading(false);
    }
  };

  const filterAnnouncementsByCategory = () => {
    if (selectedCategory === "5") {
      // If "All" is selected, show all announcements
      setFilteredAnnouncements(announcements);
    } else {
      // Filter by selected category
      const filtered = announcements.filter(
        (announcement) => announcement.category === selectedCategory
      );
      setFilteredAnnouncements(filtered);
    }
  };
  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 10); // Increment the visible count by 10
  };

  const handleAnnouncementClick = async (data) => {
    setShowAnnouncementDetails(true);
    setCurrentAnnouncement(data);
  };

  const handleEditDialog = (data) => {
    setShowEditDialog(true);
    setCurrentAnnouncement(data);
  };

  const onAddEvent = async (data) => {
    const user = JSON.parse(localStorage.getItem("userData"));

    try {
      setIsSubmitting(true);
      const res = await apiClient.post("/admin/announcement", data, {
        headers: {
          Authorization: user.token,
        },
      });

      if (res) {
        await fetchAnnouncements();
        setIsSubmitting(false);
        setShowAddDialog(false);
        form.reset();
      }
    } catch (error) {
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    } finally {
      toast({
        title: "Announcement has been created",
        description: `${date}`,
      });
    }
  };
  const onEdit = async (data) => {
    const user = JSON.parse(localStorage.getItem("userData"));

    try {
      setIsSubmitting(true);

      const { id, title, description, category } = data;

      const formData = {
        title,
        description,
        category,
      };

      const res = await apiClient.patch(`/admin/announcement/${id}`, formData, {
        headers: {
          Authorization: user.token,
        },
      });

      if (res) {
        await fetchAnnouncements();
        setIsSubmitting(false);
        setShowEditDialog(false);
        setShowAnnouncementDetails(false);
        form.reset();
      }
    } catch (error) {
      const message = error.response.data.message;
      setErrorMessage(message);
      setIsSubmitting(false);
    } finally {
      toast({
        title: "Announcement has been updated",
        description: `${date}`,
      });
    }
  };
  const onDelete = async (id) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    try {
      const res = await apiClient.delete(`/admin/announcement/${id}`, {
        headers: {
          Authorization: user.token,
        },
      });

      if (res) {
        await fetchAnnouncements();
        setIsSubmitting(false);
        setShowAddDialog(false);
        form.reset();
      }
    } catch (error) {
      const message = error.response.data.message;
      toast({
        title: { message },
        description: `${date}`,
      });
    } finally {
      toast({
        title: "Announcement deleted",
        description: `${date}`,
      });
    }
  };
  return (
    <>
      <div className="bg-[#fefefe] h-[86vh] shadow-lg rounded-lg border border-gray-200 text-gray-900 px-6 md:px-5 pb-5 flex flex-col gap-5 md:gap-8 relative">
        <div className="sticky top-0 left-0 right-0 flex flex-row justify-between w-full bg-inherit z-10 pt-8">
          <Select
            value={selectedCategory} // Set the selected value for controlled component
            onValueChange={(value) => setSelectedCategory(value)} // Set the selected category
          >
            <SelectTrigger className="w-fit lg:w-[180px]  border-zinc-300">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="bg-white border-zinc-300">
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="5">All</SelectItem>
                <SelectItem value="0">General</SelectItem>
                <SelectItem value="1">Meetings</SelectItem>
                <SelectItem value="2">Reminders</SelectItem>
                <SelectItem value="3">News</SelectItem>
                <SelectItem value="4">Alerts</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex items-start">
            <Button className=" w-[70px] md:w-full" onClick={setShowAddDialog}>
              <span className="hidden md:inline">Create announcement</span>
              <Plus className="h-4 w-4 ml-0 md:ml-2" />
            </Button>
          </div>
        </div>

        {loading ? (
          // <div className="flex flex-col items-center justify-center h-full">
          //   <div className="text-zinc-400 flex items-center gap-2">
          //     <LoaderCircle className="animate-spin" /> Loading...
          //   </div>
          // </div>
          <div className="flex flex-col gap-2 overflow-y-auto">
            <div className="shadow-sm bg-white border-[1px] rounded-lg border-zinc-300 p-5 flex flex-col gap-2">
              <div>
                <Skeleton className={"w-[190px] h-3"}></Skeleton>
              </div>
              <div>
                <Skeleton className={"w-[300px] h-3"}></Skeleton>
              </div>
              <div>
                <Skeleton className={"w-[500px] h-3"}></Skeleton>
              </div>
              <div>
                <Skeleton className={"w-[250px] h-3"}></Skeleton>
              </div>
            </div>
            <div className="shadow-sm bg-white border-[1px] rounded-lg border-zinc-300 p-5 flex flex-col gap-2">
              <div>
                <Skeleton className={"w-[190px] h-3"}></Skeleton>
              </div>
              <div>
                <Skeleton className={"w-[300px] h-3"}></Skeleton>
              </div>
              <div>
                <Skeleton className={"w-[500px] h-3"}></Skeleton>
              </div>
              <div>
                <Skeleton className={"w-[250px] h-3"}></Skeleton>
              </div>
            </div>
            <div className="shadow-sm bg-white border-[1px] rounded-lg border-zinc-300 p-5 flex flex-col gap-2">
              <div>
                <Skeleton className={"w-[190px] h-3"}></Skeleton>
              </div>
              <div>
                <Skeleton className={"w-[300px] h-3"}></Skeleton>
              </div>
              <div>
                <Skeleton className={"w-[500px] h-3"}></Skeleton>
              </div>
              <div>
                <Skeleton className={"w-[250px] h-3"}></Skeleton>
              </div>
            </div>
            <div className="shadow-sm bg-white border-[1px] rounded-lg border-zinc-300 p-5 flex flex-col gap-2">
              <div>
                <Skeleton className={"w-[190px] h-3"}></Skeleton>
              </div>
              <div>
                <Skeleton className={"w-[300px] h-3"}></Skeleton>
              </div>
              <div>
                <Skeleton className={"w-[500px] h-3"}></Skeleton>
              </div>
              <div>
                <Skeleton className={"w-[250px] h-3"}></Skeleton>
              </div>
            </div>
          </div>
        ) : filteredAnnouncements.length > 0 ? (
          <div className="flex flex-col gap-2 overflow-y-auto ">
            {filteredAnnouncements
              .slice(0, visibleCount)
              .map((announcement) => (
                <AnnouncementCard
                  key={announcement._id}
                  id={announcement._id}
                  title={announcement.title}
                  description={announcement.description}
                  category={announcement.category}
                  datePosted={formatDate(announcement.createdAt)}
                  onDelete={onDelete}
                  onClick={handleAnnouncementClick}
                />
              ))}
            {visibleCount < filteredAnnouncements.length && (
              <div className="flex justify-center mt-4">
                <Button
                  onClick={handleSeeMore}
                  className="bg-zinc-200 hover:bg-zinc-100 w-full text-zinc-900"
                >
                  See more announcements
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-zinc-400">No Announcements available.</p>
          </div>
        )}
      </div>

      <AddAnnouncementDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        form={form}
        onSubmit={onAddEvent}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />

      <AnnouncementDetails
        announcementData={currentAnnouncement}
        open={showAnnouncementDetails}
        onOpenChange={setShowAnnouncementDetails}
        onEdit={handleEditDialog}
      />
      <EditAnnouncementDialog
        announcementData={currentAnnouncement}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={onEdit}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default AnnouncementPage;
