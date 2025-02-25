import React from "react";

const AboutCard = ({orgData}) => {
  return (
    <>
      <div className="rounded-lg px-5 py-4 shadow-sm border space-y-2">
        <h2 className="text-lg font-medium">About</h2>
        <p className="break-all text-sm">{orgData.about}</p>
      </div>
      <div className="rounded-lg px-5 py-4 shadow-sm border space-y-2">
        <h2 className="text-lg font-medium">Contact</h2>
        <p className="text-pretty text-sm">{orgData.contact}</p>
      </div>
    </>
  );
};

export default AboutCard;
