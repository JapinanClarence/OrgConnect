import React from "react";
import { BookCopy, Calendar1, GraduationCap, HeartHandshake, Mail, Smartphone, User } from "lucide-react";
const yearMap = {
    1: "1st Year",
    2: "2nd Year",
    3: "3rd Year",
    4: "4th Year"
  }
  
const ProfileCard = ({ age,username, email, phone, course, year, gender }) => {
  return (
    <div className="shadow-sm rounded-lg border mx-5 space-y-4 p-4 font-normal text-sm text-gray-900 ">
      <div className="flex justify-between">
        <div className="flex-shrink text-sm">
          <Calendar1 className="my-auto inline" size={18} /> Birthday
        </div>
        <p className="col-span-4 font-medium">{age}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex-shrink text-sm">
          <HeartHandshake className="my-auto inline" size={18} /> Gender
        </div>
        <p className="col-span-4 font-medium">{gender}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex-shrink text-sm">
          <User className="my-auto inline" size={18} /> Username
        </div>
        <p className="col-span-4 font-medium">{username}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex-shrink text-sm">
          <Mail className="my-auto inline" size={18} /> Email
        </div>
        <p className="col-span-4 font-medium">{email}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex-shrink text-sm">
          <Smartphone className="my-auto inline" size={18} /> Phone
        </div>
        <p className="col-span-4 font-medium">{phone}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex-shrink text-sm">
          <BookCopy className="my-auto inline" size={18} /> Course
        </div>
        <p className="col-span-4 font-medium">{course}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex-shrink text-sm">
          <GraduationCap className="my-auto inline" size={18} /> Year
        </div>
        <p className="col-span-4 font-medium">{yearMap[year]}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
