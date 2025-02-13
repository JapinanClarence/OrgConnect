import React, { useState, useEffect, useMemo } from "react";
import apiClient from "@/api/axios";
import Statcard from "@/components/home/Statcard";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartCandlestick,
  ChartNoAxesColumn,
  ChartSpline,
  Users,
  TrendingUp,
} from "lucide-react";
import MembersChart from "../home/MembersChart";
import AnnouncementsChart from "../home/AnnouncementsChart";
import AttendeesChart from "@/components/home/AttendeesChart";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import TableComponent from "./Table";
import { dateOnly } from "@/util/helpers";
import {
  eventReportColumns,
  memberFeesReportColumns,
  transactionReportColumns,
} from "./Columns";

const ReportTab = () => {
  const [eventAttendees, setEventAttendees] = useState([]);
  const [collectedPayments, setCollectedPayments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [transactionData, setTransactionData] = useState([]);
  const [yearStarted, setYearStarted] = useState("");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await apiClient.get("/admin/dashboard/report", {
          headers: {
            Authorization: token,
          },
        });
        if (data.success) {
          const attendeesData = data.data?.attendeesCount;
          const membersFees = data.data?.membersFees;
          const transactionData = data.data?.transactions;

          const eventReport = attendeesData.map((data) => {
            return {
              _id: data._id,
              title: data.title,
              location: data.location,
              startDate: dateOnly(data.startDate),
              endDate: dateOnly(data.endDate),
              totalAttendees: data.totalAttendees,
            };
          });

          const collectedFees = membersFees.map((data) => {
            return {
              _id: data._id,
              purpose: data.purpose,
              amount: data.amount,
              date: dateOnly(data.date),
              totalCollectedPayments: data.totalCollectedPayments,
            };
          });

          const transactions = transactionData.map((data) => {
            return {
              _id: data._id,
              purpose: data.purpose,
              amount: data.amount,
              date: dateOnly(data.date),
            };
          });
          setYearStarted(data.data?.organizationStartYear);
          setEventAttendees(eventReport);
          setCollectedPayments(collectedFees);
          setTransactionData(transactions);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchReportsData();
  }, []);

  const handleSelectedCategory = (data) => {
    setSelectedCategory(data);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className=" bg-white shadow-sm md:shadow-lg rounded-lg  border border-gray-200 text-gray-900 p-5">
        <h1 className="text-2xl font-semibold border-b pb-1 mb-5">
          Generate Report
        </h1>
        <div className="">
          <TableComponent
            yearStarted={yearStarted}
            data={
              selectedCategory === "0"
                ? eventAttendees
                : selectedCategory === "1"
                ? collectedPayments
                : transactionData
            }
            loading={loading}
            rowCount={5}
            cellCount={7}
            columns={
              selectedCategory === "0"
                ? eventReportColumns
                : selectedCategory === "1"
                ? memberFeesReportColumns
                : transactionReportColumns
            }
            setSelectedCategory={handleSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportTab;
