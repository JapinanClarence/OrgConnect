import React, { useEffect, useState } from "react";
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PhilippinePeso } from "lucide-react";
import { formatDate, formatSimpleDate } from "@/util/helpers";

const PaymentsCard = ({
  showPaymentStatus = true,
  id,
  purpose,
  details,
  category,
  amount,
  amountPaid,
  status,
  createdAt,
  paidBy
}) => {
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const statusMap = {
    0: { name: "Not Fully Paid", color: "bg-red-500" },
    1: { name: "Paid", color: "bg-green-600" },
    // 2: { name: "Payment Logs", color: "bg-yellow-500" },
    // 3: { name: "News", color: "bg-purple-500" },
    // 4: { name: "Alerts", color: "bg-red-500" },
  };

  const badgeCategory = statusMap[status] || {
    name: "Not Paid",
    color: "bg-gray-500",
  };

  return (
    <>
      <Card key={id} className="shadow-sm border border-slate-200">
        <CardContent className="p-3 md:p-5">
          {/* <CardHeader className="flex text-xs flex-col md:flex-row p-0">
            <span className="font-bold text-xs mr-2">Posted on:</span>
            {datePosted}
          </CardHeader> */}

          <CardTitle className="text-md">
            {purpose}
            {badgeCategory && (
              <Badge
                className={`ml-2 hidden md:inline ${badgeCategory.color} text-white hover:${badgeCategory.color}`}
              >
                {badgeCategory.name}
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="text-pretty md:text-wrap overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
            {showFullDetails
              ? details
              : details?.slice(0, 100) + (details?.length > 100 ? "..." : "")}
            {details?.length > 100 && (
              <button
                className="block text-slate-600 font-bold hover:underline"
                onClick={() => setShowFullDetails(!showFullDetails)}
              >
                {showFullDetails ? "See Less" : "See More"}
              </button>
            )}
          </CardDescription>
          {showPaymentStatus && (
            <>
              <div className="text-sm text-muted-foreground">
                <h2 className="font-bold">Amount Paid:</h2>
                <span className="inline-flex items-center">
                  <PhilippinePeso size={12} /> {amountPaid || 0}
                </span>
              </div>
              <CardFooter className="inline md:hidden p-0">
                {badgeCategory && (
                  <Badge className={`${badgeCategory.color} text-white`}>
                    {badgeCategory.name}
                  </Badge>
                )}
              </CardFooter>
            </>
          )}
          {amount && (
            <div className="text-sm text-muted-foreground">
              <h2 className="font-bold">Amount:</h2>
              <span className="inline-flex items-center">
                <PhilippinePeso size={12} /> {amount}
              </span>
            </div>
          )}
          {createdAt && (
            <div className="text-sm text-muted-foreground">
              <h2 className="font-bold">Date paid:</h2>
              <span className="inline-flex items-center">
                {formatSimpleDate(createdAt)}
              </span>
            </div>
          )}
          {paidBy && (
            <div className="text-sm text-muted-foreground">
              <h2 className="font-bold">Paid by:</h2>
              <span className="inline-flex items-center">
                {paidBy}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PaymentsCard;
