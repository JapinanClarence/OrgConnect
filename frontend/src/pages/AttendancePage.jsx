import AttendanceTable from '@/components/attendance/AttendanceTable';
import React from 'react'
const data = [
    {
      title: "Team Meeting",
      start: "2024-10-14 09:00",
      end: "2024-10-14 10:30",
      active: true,
      location: "Conference Room A",
      description: "Monthly team meeting to discuss project progress and roadblocks."
    },
    {
      title: "Product Launch",
      start: "2024-10-15 13:00",
      end: "2024-10-15 14:30",
      active: true,
      location: "Main Hall",
      description: "Official product launch event for the new line of devices."
    },
    {
      title: "Marketing Strategy Review",
      start: "2024-10-16 11:00",
      end: "2024-10-16 12:00",
      active: false,
      location: "Online - Zoom",
      description: "A review of the marketing strategy for Q4 campaigns."
    },
    {
      title: "Client Feedback Session",
      start: "2024-10-17 15:00",
      end: "2024-10-17 16:30",
      active: false,
      location: "Conference Room B",
      description: "Gathering client feedback for the latest product release."
    },
    {
      title: "Team Building Workshop",
      start: "2024-10-20 09:30",
      end: "2024-10-20 17:00",
      active: false,
      location: "Outdoor Park",
      description: "Full-day team-building activities to foster collaboration and teamwork."
    },
    {
      title: "Board Meeting",
      start: "2024-10-21 14:00",
      end: "2024-10-21 17:00",
      active: true,
      location: "Executive Meeting Room",
      description: "Quarterly board meeting to review company performance and future strategies."
    },
  ];
  
const AttendancePage = () => {
  return (
    <div className="bg-[#fefefe] shadow-lg rounded-lg border border-gray-200 text-gray-900 px-6 py-5 flex flex-col relative">
      <h1 className="font-bold">Event Attendance Table</h1>
      <p className="text-sm text-muted-foreground">
        Manage your event attendance here
      </p>
      <AttendanceTable data={data}/>
    </div>
  )
}

export default AttendancePage
