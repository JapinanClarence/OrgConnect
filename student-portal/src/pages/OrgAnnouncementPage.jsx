import React, { useState, useEffect } from "react";
import PageHead from "@/components/nav/PageHead";
import AnnouncementCard from "@/components/annoucement/AnnouncementCard";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { formatDate } from "@/util/helpers";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AnnouncementSkeleton from "@/components/skeleton/AnnouncementSkeleton";

const OrgAnnouncementPage = () => {
  const { token, userData } = useAuth();
  const [announcementData, setAnnouncementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("5");
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const params = useParams();

  const fetchData = async () => {
    try {
      const { data } = await apiClient.get(
        `/user/organization/${params.id}/announcements`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!data.success) {
        setAnnouncementData([]);
      } else {
        setAnnouncementData(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 10); // Increment the visible count by 10
  };

  const filterAnnouncementsByCategory = () => {
    if (selectedCategory === "5") {
      // If "All" is selected, show all announcements
      setFilteredAnnouncements(announcementData);
    } else {
      // Filter by selected category
      const filtered = announcementData.filter(
        (announcement) => announcement.category === selectedCategory
      );
      setFilteredAnnouncements(filtered);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAnnouncementsByCategory();
  }, [announcementData, selectedCategory]);

  return (
    <div className="pt-16 px-5">
      <PageHead title={"Announcements"} />

      <div className="flex justify-end mb-2">
        <Select
          value={selectedCategory} // Set the selected value for controlled component
          onValueChange={(value) => setSelectedCategory(value)} // Set the selected category
        >
          <SelectTrigger className="w-[100px] h-10 py-1  border-zinc-300">
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
      </div>
      {loading ? (
        <div className="space-y-2 pb-10">
          <AnnouncementSkeleton items={5} />
        </div>
      ) : filteredAnnouncements.length > 0 ? (
        <div className="space-y-2 pb-10">
          {filteredAnnouncements.slice(0, visibleCount).map((announcement) => (
            <AnnouncementCard
              key={announcement._id}
              id={announcement._id}
              title={announcement.title}
              description={announcement.description}
              category={announcement.category}
              datePosted={formatDate(announcement.createdAt)}
              postedBy={announcement.organization.name}
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
        <div className="flex items-center justify-center h-1/2">
          <p className="text-zinc-400">No Announcements available.</p>
        </div>
      )}
    </div>
  );
};

export default OrgAnnouncementPage;
