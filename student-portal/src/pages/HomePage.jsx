import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import OrgCards from "@/components/home/OrgCards";
import EventCards from "@/components/home/EventCards";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { timeOnly, shortMonth } from "@/util/helpers";
import OrgCardSkeleton from "@/components/skeleton/OrgCardSkeleton";
import EventSkeleton from "@/components/skeleton/EventSkeleton";

const HomePage = () => {
  const { token, userData } = useAuth();
  const [orgData, setOrgData] = useState([]);
  const [eventData, setEventData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const loading = true;
  const fetchStudentOrgs = async () => {
    try {
      const { data } = await apiClient.get("/user/organization/?my_orgs=true", {
        headers: {
          Authorization: token,
        },
      });
      if (data) {
        setOrgData(data.data.slice(0, 5));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data } = await apiClient.get("/user/events/", {
        headers: {
          Authorization: token,
        },
      });
      if (data) {
        const event = data.data;
        const cleanedData = event.map((data) => {
          const date = preProcessDate(data.startDate, data.endDate);
          return {
            id: data._id,
            title: data.title,
            description:
              data.description.length > 100
                ? `${data.description.slice(0, 100)}...`
                : data.description,
            location: data.location,
            date,
          };
        });
        setEventData(cleanedData.slice(0, 10));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const preProcessDate = (startDate, endDate) => {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    const s = sDate.toLocaleString("en-US", {
      year: "numeric", // Full year
      month: "2-digit", // 2-digit month (MM)
      day: "2-digit", // Day of the month with leading zero (DD)
    });
    const e = eDate.toLocaleString("en-US", {
      year: "numeric", // Full year
      month: "2-digit", // 2-digit month (MM)
      day: "2-digit", // Day of the month with leading zero (DD)
    });

    if (s !== e) {
      return `${sDate} - ${eDate}`;
    } else {
      return `${shortMonth(startDate)} - ${timeOnly(endDate)}`;
    }
  };

  useEffect(() => {
    fetchStudentOrgs();
    fetchEvents();
  }, []);
  return (
    <div className="pt-16 pb-16  ">
      <div className="">
        <div className=" flex justify-start items-center gap-3 p-5">
          <Avatar className="cursor-pointer size-14">
            <AvatarImage src={userData.profilePicture} alt="@shadcn" />
            <AvatarFallback className="text-gray-500 font-bold bg-gray-200">
              {userData.firstname.charAt(0) + userData.lastname.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <h1 className="font-bold text-2xl text-zinc-800">
              {" "}
              Hi, {userData.firstname} {userData.lastname}!{" "}
            </h1>
            <p className="text-sm text-muted-foreground">{userData.email}</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="px-5 py-2 mb-2 space-y-4 ">
            <Input
              className="rounded-full border-none bg-slate-200 "
              placeholder="Search organizations..."
            />
            <div className="flex justify-between">
              <h1 className="font-semibold mb-2 "> Your Organizations</h1>
              <span className="text-muted-foreground">See all</span>
            </div>
          </div>

          {loading ? (
            <div className="flex overflow-x-clip snap-x snap-mandatory gap-5 ml-5 pb-2">
              <OrgCardSkeleton items={2} />
            </div>
          ) : (
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 ml-5 pb-2">
              {orgData.map((data) => (
                <OrgCards
                  key={data.id}
                  orgImage={data.banner}
                  title={data.name}
                  about={data.about}
                />
              ))}
            </div>
          )}

          <div className="px-5 mt-5">
            <div className="sticky top-[3.6rem] bg-slate-50 pb-2 flex justify-between z-10">
              <h1 className="font-semibold ">Recent Events</h1>
              <span className="text-muted-foreground">See all</span>
            </div>
            <div className="space-y-2">
              {loading ? (
                <EventSkeleton items={5} />
              ) : (
                eventData &&
                eventData.map((data) => (
                  <EventCards
                    key={data.id}
                    title={data.title}
                    description={data.description}
                    date={data.date}
                    location={data.location}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
