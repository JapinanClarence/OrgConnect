import React from 'react'

const OrgHeader = ({orgData}) => {
  return (
    <>
    <div
      className={`${
        !orgData.banner
          ? "bg-gray-200"
          : "bg-gradient-to-r from-gray-800 to-gray-900 opacity-80"
      }  absolute h-full w-full `}
    ></div>
    <div className=" absolute top-0 h-full w-full flex justify-center items-center ">
      <h1
        className={`${
          !orgData.banner ? "text-gray-900" : "text-white"
        } font-medium text-2xl font-accent`}
      >
        {orgData.name}
      </h1>
    </div>
  </>
  )
}

export default OrgHeader
