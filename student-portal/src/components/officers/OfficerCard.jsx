import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Info } from "lucide-react";
import { Button } from "../ui/button";
import OfficerDialog from "./OfficerDialog";

const OfficerCard = ({ data }) => {
  const [showDialog, setShowDialog] = useState(false);
  const fullname = `${data.firstname} ${
    data.middlename ? data.middlename[0] + ". " : ""
  }${data.lastname}`;

  const position =
    data.position[0].toUpperCase() + data.position.slice(1).toLowerCase();
  return (
    <Card  className="w-[320px] shadow-md ">
      <div className="relative h-[200px] w-full overflow-hidden bg-zinc-300 rounded-t-lg">
        {/* <div className=" absolute top-0 h-full w-full bg-gradient-to-r from-gray-800 to-gray-900 opacity-70 "></div> */}
        {data.profilePicture && (
          <img
            src={data.profilePicture}
            alt="Officer profile"
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <CardContent className="p-5 flex justify-between ">
        <div>
          <CardTitle>{fullname}</CardTitle>
          <CardDescription>{position}</CardDescription>
        </div>

        <div className="inline-flex justify-center items-center">
          <Button
            onClick={() => setShowDialog(true)}
            variant=""
            className="p-3 rounded-sm bg-gray-800"
          >
            <Info className="h-10 w-19" size={25} />
          </Button>
        </div>
      </CardContent>
      <OfficerDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        name={fullname}
        position={position}
        email={data.email}
        year={data.year}
        course={data.course}
      />
    </Card>
  );
};

export default OfficerCard;
