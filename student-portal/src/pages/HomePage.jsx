import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import OrgCards from "@/components/organization/OrgCards";
import EventCards from "@/components/event/EventCards";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import OrgCardSkeleton from "@/components/skeleton/OrgCardSkeleton";
import EventSkeleton from "@/components/skeleton/EventSkeleton";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/nav/Header";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const { token, userData } = useAuth();
  const [orgData, setOrgData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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

        setEventData(event.slice(0, 10));
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

  const handleClick = async (data) => {
    navigate(`/organization/${data}`);
  };

  return (
    <div className="pt-16">
      <Header />
      <div className="flex justify-start items-center gap-3 py-5 px-5">
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

      <div className="py-2 mb-2 px-5">
        <Input
          className="rounded-full border-none bg-slate-200 "
          placeholder="Search organizations..."
        />
      </div>
      <div className="flex justify-between mx-5">
        <h1 className="font-semibold mb-2 "> Your Organizations</h1>
        <Link to="/organization" className="text-muted-foreground">
          See More
        </Link>
      </div>
      {loading ? (
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 px-5 scrollbar-hidden">
          <OrgCardSkeleton items={2} />
        </div>
      ) : orgData <= 0 ? (
        <div className="mx-5 h-[200px] border bg-slate-200 shadow-sm  border-zinc-300 rounded-lg flex items-center justify-center">
          <Button
            variant="link"
            className="text-muted-foreground text-md"
            size="lg"
          >
            Click see more to discover
          </Button>
        </div>
      ) : (
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5  px-5 scrollbar-hidden">
          {orgData.map((data) => (
            <OrgCards
              key={data.id}
              id={data.id}
              orgImage={data.banner}
              title={data.name}
              about={data.about}
              onClick={handleClick}
            />
          ))}
        </div>
      )}
      <div className="border-b my-6 mx-5"></div>
      <div className="mx-5 pb-20">
        <div className="sticky top-[3.6rem] bg-slate-50 pb-2 flex justify-start z-10">
          <h1 className="font-semibold ">Recent Events</h1>
        </div>
        <div className="flex flex-col gap-2">
          {loading ? (
            <EventSkeleton items={5} />
          ) : eventData <= 0 ? (
            <div className="w-full py-10 flex justify-center content-center text-muted-foreground">
              No recent events
            </div>
          ) : (
            eventData.map((data) => (
              <EventCards
                key={data._id}
                title={data.title}
                description={data.description}
                date={data.date}
                startDate={data.startDate}
                endDate={data.endDate}
                location={data.location}
                postedBy={data.organization.name}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
