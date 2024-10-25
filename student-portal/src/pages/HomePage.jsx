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
import { Link } from "react-router-dom";
import Header from "@/components/nav/Header";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
const HomePage = () => {
  const { token, userData } = useAuth();
  const [orgData, setOrgData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const loading = true;
  const fetchStudentOrgs = async () => {
    try {
      const { data } = await apiClient.get("/user/organization/?my_orgs=true", {
        headers: {
          Authorization: token,
        },
      });
      if (!data.success) {
        setOrgData([]);
      } else {
        setOrgData(data.data.slice(0, 5));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data } = await apiClient.get("/user/events/", {
        headers: {
          Authorization: token,
        },
      });
      if (!data.success) {
        setEventData([]);
      } else {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchStudentOrgs(), fetchEvents()]);
      setLoading(false);
    };
    fetchData();
  }, [token]);

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
  return (
    <div>
      <Header />
      <div className="py-16 px-5 ">
        <div className=" flex justify-start items-center gap-3 py-5">
          <Avatar className="size-14">
            <AvatarImage src={userData.profilePicture} alt="user profile" />
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
          <div className="py-2 mb-2 space-y-4 ">
            <Input
              className="rounded-full border-none bg-slate-200 "
              placeholder="Search organizations..."
            />
          </div>

          {loading ? (
            <div className="flex overflow-x-clip snap-x snap-mandatory gap-5 pb-2">
              <OrgCardSkeleton items={2} />
            </div>
          ) : orgData <= 0 ? (
            <div className="w-full h-[200px] bg-slate-200 rounded-lg flex items-center justify-center">
              <Button variant="link" className="" size="sm">
                <Plus /> Join Organizaton
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between">
                <h1 className="font-semibold mb-2 "> Your Organizations</h1>
                <Link to="/organization" className="text-muted-foreground">
                  See all
                </Link>
              </div>
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-2">
                {orgData.map((data) => (
                  <OrgCards
                    key={data.id}
                    orgImage={data.banner}
                    title={data.name}
                    about={data.about}
                  />
                ))}
              </div>
            </>
          )}
          <div className="border-b my-5"></div>
          <div className="">
            <div className="sticky top-[3.6rem] bg-slate-50 pb-2 flex justify-start z-10">
              <h1 className="font-semibold ">Recent Events</h1>
            </div>
            <div className="space-y-2">
              {loading ? (
                <EventSkeleton items={5} />
              ) : eventData <= 0 ? (
                <div className="w-full py-10 flex justify-center content-center text-muted-foreground">
                  No recent events
                </div>
              ) : (
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
