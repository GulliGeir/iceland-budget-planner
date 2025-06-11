
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-slate-800 text-slate-300 py-8 safe-area-bottom"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-2">
              <Globe className="w-6 h-6 mr-2 text-blue-400" />
              <span className="text-lg font-semibold text-white">Iceland Budget Planner</span>
            </div>
            <p className="text-sm">Plan your dream Icelandic adventure with ease and affordability. Powered by affordableiceland.is (mock data).</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-white mb-2">Quick Links</p>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-blue-300 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-semibold text-white mb-2">Connect With Us</p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-blue-300 transition-colors"><Facebook className="w-6 h-6" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-blue-300 transition-colors"><Instagram className="w-6 h-6" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-300 transition-colors"><Twitter className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-700 text-center text-sm">
          <p>&copy; {currentYear} Iceland Budget Planner. All rights reserved.</p>
          <p>Created with ❤️ by Hostinger Horizons</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
