import { motion } from "framer-motion";
import Header from "../components/Header";
import Statcard from "../components/Statcard";
import { ChartCandlestick, ChartNoAxesColumn, ChartSpline, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
			<Header title='Dashboard' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-flow-row lg:grid-flow-col grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
          <Statcard name='Total Members' icon={Users} value='1,234' color='#8B5CF6' />
					<Statcard name='Total Sales' icon={ChartCandlestick} value='$12,345' color='#6366F1' />
					<Statcard name='Total Products' icon={ChartSpline} value='567' color='#EC4899' />
					<Statcard name='Conversion Rate' icon={ChartNoAxesColumn} value='12.5%' color='#10B981' />
				</motion.div>

				{/* CHARTS */}

				{/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart />
					<CategoryDistributionChart />
					<SalesChannelChart />
				</div> */}
			</main>
		</div>
  );
};

export default Dashboard;
