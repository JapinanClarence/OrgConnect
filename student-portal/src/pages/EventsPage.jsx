import React, { useEffect, useState } from "react";
import PageHead from "@/components/nav/PageHead";
import apiClient from "@/api/axios";
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import EventCards from "@/components/event/EventCards";
import { shortMonth, timeOnly } from "@/util/helpers";
import EventSkeleton from "@/components/skeleton/EventSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendingTab from "@/components/event/PendingTab";
import OngoingTab from "@/components/event/OngoingTab";
import OpenTab from "@/components/event/OpenTab";
import CloseTab from "@/components/event/CloseTab";

const EventsPage = () => {
  const [pendingEventData, setPendingEventData] = useState([]);
  const [closeEventData, setCloseEventData] = useState([]);
  const [ongoingEventData, setOngoingEventData] = useState([]);
  const [openEventData, setOpenEventData] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchData = async () => {
    try {
      const { data } = await apiClient.get(
        `/user/organization/${params.id}/events`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!data.success) {
        setPendingEventData([]);
      } else {
        const event = data.data;
        console.log(event)
        const pendingEvent = event.filter((data) => data.status ==="1");
        const ongoingEvent = event.filter((data) => data.status ==="2");
        const openEvent = event.filter((data) => data.status === "3");
        const closeEvent = event.filter((data) => data.status === "0"); 

        setCloseEventData(closeEvent);
        setOngoingEventData(ongoingEvent);
        setOpenEventData(openEvent);
        setPendingEventData(pendingEvent);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pt-16">
      <PageHead title={"Events"} />
      <Tabs defaultValue="upcoming" className="px-5">
        <TabsList className="grid grid-cols-4  bg-zinc-200 mb-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="close">Close</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <PendingTab loading={loading} eventData={pendingEventData}/>
        </TabsContent>
        <TabsContent value="ongoing">
          <OngoingTab loading={loading} eventData={ongoingEventData} />
        </TabsContent>
        <TabsContent value="open">
          <OpenTab loading={loading} eventData={openEventData} />
        </TabsContent>
        <TabsContent value="close">
          <CloseTab loading={loading} eventData={closeEventData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsPage;
