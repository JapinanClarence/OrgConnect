import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const StatCard = ({ name, icon: Icon, value, color, loading }) => {
  return (
    <motion.div
      className="md:border md:shadow-lg bg-white border-slate-200 overflow-hidden rounded-lg"
      // whileHover={{ y: -5, boxShadow: "0 15px 20px -12px rgba(0, 0, 0, 0.5)" }}
    >
      {loading ? (
        <Skeleton className={"h-[100px]"}/>
      ) : (
        <div className="md:px-4 md:py-5 p-6">
          <span className="flex items-center text-lg font-semibold ">
            <Icon size={20} className="mr-2" style={{ color }} />
            {name}
          </span>
          <p className="mt-1 text-2xl font-medium ">{value}</p>
        </div>
      )}
    </motion.div>
  );
};
export default StatCard;
