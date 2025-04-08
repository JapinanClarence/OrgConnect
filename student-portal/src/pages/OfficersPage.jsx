import React, { useState, useEffect } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import PageHead from "@/components/nav/PageHead";
import DataTable from "@/components/payments/DataTable";
import OfficerCard from "@/components/officers/OfficerCard";
import OfficerCardSkeleton from "@/components/skeleton/OfficerCardSkeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const OfficersPage = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await apiClient.get(
        `/user/organization/${params.id}/officers`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data.success) {
        console.log(data.data);
        setData(data.data);
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

  // Group by schoolYear
  const grouped = data.reduce((acc, officer) => {
    if (!acc[officer.schoolYear]) acc[officer.schoolYear] = [];
    acc[officer.schoolYear].push(officer);
    return acc;
  }, {});

  // Sort school years high → low
  const sortedYears = Object.keys(grouped).sort((a, b) => {
    const [startA] = a.split("-").map(Number);
    const [startB] = b.split("-").map(Number);
    return startB - startA;
  });
  return (
    <div className="pt-16 pb-10 h-full">
      <PageHead title={"Officers"} />
      <div className="px-5 h-full">
        {loading ? (
          <div className="mt-5 flex flex-col gap-4 items-center">
            <OfficerCardSkeleton items={5} />
          </div>
        ) : data.length <= 0 ? (
          <div className="flex items-center justify-center h-1/2">
            <p className="text-zinc-400">No officers found.</p>
          </div>
        ) : (
          <div className="mt-5">
            <Accordion
              className="min-w-max "
              type="single"
              collapsible
              defaultValue="item-0"
            >
              {sortedYears.map((year, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{year}</AccordionTrigger>
                  <AccordionContent>
                    {grouped[year].map((officerData) => (
                      <OfficerCard key={officerData.id} data={officerData} />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficersPage;
