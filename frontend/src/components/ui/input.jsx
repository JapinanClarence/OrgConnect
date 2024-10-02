

const input = ({...props}) => {
  return (
    <div className="relative mb-6">
        <input {...props} className="rounded-md border w-full text-sm px-3 py-2 focus:outline-1 focus:ring-0 focus:border-gray-600" />
    </div>
  )
}

export default input
