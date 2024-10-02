// src/components/Header.js
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

const Header = ({ title }) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Menu Button */}
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
		
      </div>
    </header>
  );
};

export default Header;