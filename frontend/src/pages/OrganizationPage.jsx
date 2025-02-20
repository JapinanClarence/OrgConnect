import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/api/axios";
import { dateOnly, formatDate, formatSimpleDate } from "@/util/helpers";
import { jsPDF } from "jspdf";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, ChartCandlestick, ChartNoAxesColumn, FileText } from "lucide-react";
import { Label } from "@/components/ui/label";
import TransactionsTable from "@/components/superadmin/TransactionsTable";
import { Button } from "@/components/ui/button";

const categoryMap = {
  0: "Fees",
  1: "Expenditure",
  2: "Payment Logs",
};


const OrganizationPage = () => {
  const [loading, setLoading] = useState(true);
  const [orgData, setOrgData] = useState("");
  const [totalEvents, setTotalEvents] = useState("");
  const [totalCollections, setTotalCollections] = useState("");
  const [totalExpenses, setTotalExpenses] = useState("");
  const [totalMales, setTotalMales] = useState("");
  const [totalFemales, setTotalFemales] = useState("");
  const [transactions, setTransactions] = useState([]);
  const { token } = useAuth();
  const params = useParams();
  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    try {
      const { data } = await apiClient.get(
        `/superadmin/organization/${params.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data.success) {
        setOrgData(data.data);
        setTotalCollections(data.totalCollectedPayments);
        setTotalEvents(data.totalEvents);
        setTotalExpenses(data.totalExpenses);
        setTotalFemales(data.totalFemaleMembers);
        setTotalMales(data.totalMaleMembers);

        const cleanTransactionsData = data.transactions.map((data) =>{
          return {
            _id: data._id,
            purpose: data.purpose,
            amount: data.amount,
            date: dateOnly(data.createdAt),
            category : categoryMap[data.category]
          }
        });
        //array of transactions
        setTransactions(cleanTransactionsData);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
  
    // Title
    doc.setFontSize(18);
    doc.text("Organization Report", 14, 20);
  
    // Summary Section
    doc.setFontSize(12);
    doc.text(`Total Collections: ₱${totalCollections.toFixed(2)}`, 14, 35);
    doc.text(`Total Expenses: ₱${totalExpenses.toFixed(2)}`, 14, 43);
    doc.text(`Total Events: ${totalEvents}`, 14, 51);
    doc.text(`Total Male Members: ${totalMales}`, 14, 59);
    doc.text(`Total Female Members: ${totalFemales}`, 14, 67);
  
    // Transactions Table
    doc.autoTable({
      startY: 75,
      head: [["Date", "Purpose", "Category", "Amount (₱)"]],
      body: transactions.map((t) => [
        t.date,
        t.purpose,
        t.category,
        t.amount.toFixed(2),
      ]),
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 10 },
    });
  
    // Save the PDF
    doc.save("Organization_Report.pdf");
  };
  return (
    <>
      <div className="flex flex-col gap-3 p-2">
        <div className=" bg-white shadow-sm md:shadow-lg rounded-lg  border border-gray-200 overflow-clip p-5">
          <div className="">
            <div className="flex justify-between border-b pb-1 items-center">
              {loading ? (
              <Skeleton className={"h-10"} />
            ) : (
              <>
                <h1 className="text-2xl font-semibold">
                  {orgData.name}
                </h1>
              </>
            )}
            <Button onClick={exportToPDF} variant=""><FileText/>Export</Button>
            </div>
            
            <div className="grid grid-cols-4 gap-5 mt-5">
              <Card className="sm:shadow-none shadow-lg w-full">
                <CardHeader className="px-4 pt-5 pb-0">
                  <CardTitle className="text-lg ">
                    <span className="flex items-center text-md font-semibold ">
                      <Building
                        size={15}
                        className="mr-2"
                        style={{ color: "#8B5CF6" }}
                      />
                      Total Members
                    </span>
                    <span className="mt-1 text-2xl font-medium ">
                      {totalMales + totalFemales}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className={"px-4 pb-5"}>
                  <div className="space-x-2 h-full">
                    <span className="bg-blue-200 text-blue-500 font-semibold text-xs py-1 px-2 rounded-md">{`${totalMales} Males`}</span>
                    <span className="bg-pink-200 text-pink-600 font-semibold text-xs py-1 px-2 rounded-md">{`${totalFemales} Females`}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="sm:shadow-none shadow-lg w-full">
                <CardHeader className="px-4 py-5">
                  <CardTitle className="text-lg ">
                    <span className="flex items-center text-md font-semibold ">
                      <ChartNoAxesColumn
                        size={15}
                        className="mr-2"
                        style={{ color: "#10B981" }}
                      />
                      Total Collections
                    </span>
                    <span className="mt-1 text-2xl font-medium ">
                      {totalCollections}
                    </span>
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card className="sm:shadow-none shadow-lg w-full">
                <CardHeader className="px-4 py-5">
                  <CardTitle className="text-lg ">
                    <span className="flex items-center text-md font-semibold ">
                      <ChartNoAxesColumn
                        size={15}
                        className="mr-2"
                        style={{ color: "#10B981" }}
                      />
                      Total Expenses
                    </span>
                    <span className="mt-1 text-2xl font-medium ">
                      {totalExpenses}
                    </span>
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card className="sm:shadow-none shadow-lg w-full">
                <CardHeader className="px-4 py-5">
                  <CardTitle className="text-lg ">
                    <span className="flex items-center text-md font-semibold ">
                      <ChartCandlestick
                        size={15}
                        className="mr-2"
                        style={{ color: "#10B981" }}
                      />
                      Total Event Created
                    </span>
                    <span className="mt-1 text-2xl font-medium ">
                      {totalEvents}
                    </span>
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
        <div>
          <div className="md:bg-[#fefefe] md:shadow-lg rounded-lg md:border md:border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
            <Label className="font-semibold text-xl">Transactions</Label>
            <TransactionsTable data={transactions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationPage;
