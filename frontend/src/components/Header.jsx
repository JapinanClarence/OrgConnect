// src/components/Header.js
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <Menu color={"#6366f1"} size={24} />
        </motion.button>
		
      </div>
    </header>
  );
};

export default Header;
