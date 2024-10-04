import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

const Loginform = () => {
  return (
    <motion.Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="m-10 p-8 rounded-xl space-y-4 bg-white max-w-3xl w-[450px] shadow border border-slate-300"
    >
      <CardHeader>
        <img
          src="OrgConnect-transparent.svg"
          alt="OrgConnect logo"
          className="w-16 h-16 mx-auto"
        />
        <h1 className="font-bold text-2xl text-gray-900">Login</h1>
        <p className="text-sm text-gray-600">
          Fill in the form to get started.
        </p>
      </CardHeader>
      <CardContent>
            
      </CardContent>
      <CardFooter>
        Sample
      </CardFooter>
    </motion.Card>
  );
};

export default Loginform;
