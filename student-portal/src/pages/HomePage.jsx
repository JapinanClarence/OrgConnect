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
import { ChevronDown } from "lucide-react";
import StatusCardSkeleton from "@/components/skeleton/StatusCardSkeleton";
const HomePage = () => {
  const { token, userData, setUserData } = useAuth();
  const [orgData, setOrgData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [totalAbsent, setTotalAbsent] = useState("");
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
        const events = data.data;
        
        const upcomingEvents = events.filter((event)=> event.status ==="1")
        
        setEventData(upcomingEvents.slice(0, 10));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAbsentCount = async () => {
    try {
      const { data } = await apiClient.get("/user/totalAbsent/", {
        headers: {
          Authorization: token,
        },
      });
      if (!data.success) {
        setTotalAbsent(0); // if no close events found, set total absent to 0
      } else {
        setTotalAbsent(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserData = async () => {
    try {
      const { data } = await apiClient.get("/user/", {
        headers: {
          Authorization: token,
        },
      });
      if (data.success) {
        setUserData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchStudentOrgs(),
        fetchEvents(),
        fetchUserData(),
        fetchAbsentCount(),
      ]);
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
        <Avatar className="size-14 overflow-clip">
          <AvatarImage
            src={userData.profilePicture}
            alt="user profile"
            className="object-cover"
          />
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
      {loading ? (
        <StatusCardSkeleton />
      ) : (
        <div className="mt-2 mb-4 mx-5 p-3 rounded-lg bg-white shadow-sm border flex justify-between">
          <div>
            <h1 className="font-medium text-lg">Activity Status</h1>
            <p className="text-muted-foreground text-sm">
              You have{" "}
              {totalAbsent.totalAbsences == null
                ? 0
                : totalAbsent.totalAbsences}{" "}
              total absences.
            </p>
          </div>
          <Link to={"/attendance"}>
            <ChevronDown />
          </Link>
        </div>
      )}

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
          <h1 className="font-semibold ">Upcoming Events</h1>
        </div>
        <div className="flex flex-col gap-2">
          {loading ? (
            <EventSkeleton items={5} />
          ) : eventData <= 0 ? (
            <div className="w-full py-10 flex justify-center content-center text-muted-foreground">
              No upcoming events
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
                status={data.status}
                eventBy={data.organization?.name}
                postedBy={data.postedBy?.position}
                eventFee={data.fee}
                organizer={data.organizer}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
