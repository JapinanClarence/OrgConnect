import React, { useState, useEffect, useMemo } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import TableComponent from "@/components/dashboard/Table";
import { dateOnly } from "@/util/helpers";
import {
  eventReportColumns,
  memberFeesReportColumns,
  transactionReportColumns,
} from "@/components/dashboard/Columns";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

const ReportsPage = () => {
  const [eventAttendees, setEventAttendees] = useState([]);
  const [collectedPayments, setCollectedPayments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [transactionData, setTransactionData] = useState([]);
  const [collectionReport, setCollectionReport] = useState([]);
  const [eventReport, setEventReport] = useState([]);
  const [yearStarted, setYearStarted] = useState("");
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchReportsData = async () => {
      try {
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
              category: "Events",
            };
          });

          const collectedFees = membersFees.map((data) => {
            return {
              _id: data._id,
              purpose: data.purpose,
              amount: data.amount,
              date: dateOnly(data.date),
              totalCollectedPayments: data.totalCollectedPayments,
              category: "Collections",
            };
          });

          const transactions = transactionData.map((data) => {
            return {
              _id: data._id,
              purpose: data.purpose,
              amount: data.amount,
              date: dateOnly(data.date),
              category: "Transactions",
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

  const onGenerate = async (data, reportType) => {
    const isEvent = data.category === "Events";
    const isCollection = data.category === "Collections";
    const shouldExportPDF = reportType === "pdf";
    const shouldExportExcel = reportType === "excel";

    let report = null;

    if (isEvent) {
      report = await fetchEventReport(data._id);
    } else if (isCollection) {
      report = await fetchCollectionReport(data._id);
    }

    if (!report) {
      console.error("Failed to fetch report data.");
      return;
    }

    if (shouldExportPDF) {
      exportToPDF(
        {
          title: isEvent ? "Total Attendees" : "Total Collected Payments",
          sum: isEvent ? report.totalAttendees : report.totalCollectedPayments,
        },
        isEvent ? report.attendees : report.membersFees,
        isEvent ? report.title : report.purpose
      );
    } else if (shouldExportExcel) {
      exportToExcel(
        isEvent ? report.title : report.purpose,
        isEvent ? report.attendees : report.membersFees
      );
    }
  };

  const fetchEventReport = async (id) => {
    try {
      const { data } = await apiClient.get(
        `/admin/dashboard/eventReport/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data.success) {
        return data.data;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const fetchCollectionReport = async (id) => {
    try {
      const { data } = await apiClient.get(
        `/admin/dashboard/collectionReport/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data.success) {
        return data.data;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const exportToPDF = (summary, data, title) => {
    const doc = new jsPDF();
    doc.text(title || "OrgConnect Reports", 10, 10);

    doc.text(`${summary.title}: ${summary.sum}`, 10, 20);
    if (!data.length) {
      doc.text("No data available", 10, 30);
      doc.save(`${title || "report"}.pdf`);
      return;
    }

    // Dynamically get headers from object keys
    const tableHeaders = Object.keys(data[0]);

    // Format the data rows
    const tableData = data.map((row) =>
      tableHeaders.map((key) => {
        const value = row[key];
        return typeof value === "number" ? `${value}` : value;
      })
    );

    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 30,
    });

    doc.save(`${title || "report"}.pdf`);
  };

  // Function to export table data to Excel
  const exportToExcel = (title, data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `${title || "report"}.xlsx`);
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
            onGenerate={onGenerate}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
