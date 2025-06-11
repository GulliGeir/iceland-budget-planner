
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Mountain, Menu, X, UserCircle, Settings, HelpCircle } from 'lucide-react';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { toast } = useToast();

  const menuItems = [
    { label: 'Profile', icon: UserCircle, action: () => toast({ title: "🚧 Profile feature coming soon!", description: "You'll be able to manage your profile here."}) },
    { label: 'Settings', icon: Settings, action: () => toast({ title: "🚧 Settings feature coming soon!", description: "Customize your app experience here."}) },
    { label: 'Help', icon: HelpCircle, action: () => toast({ title: "🚧 Help feature coming soon!", description: "Find answers to your questions here."}) },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="gradient-bg text-white safe-area-top sticky top-0 z-50 shadow-lg"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Mountain className="w-8 h-8 text-yellow-300" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Iceland Budget Planner</h1>
              <p className="text-xs text-white/80">Your adventure starts here!</p>
            </div>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMenu(!showMenu)}
            className="text-white hover:bg-white/20 md:hidden"
            aria-label="Toggle menu"
          >
            {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>

          <nav className="hidden md:flex space-x-2">
            {menuItems.map(item => (
              <Button key={item.label} variant="ghost" className="text-white hover:bg-white/20" onClick={item.action}>
                <item.icon className="w-5 h-5 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white shadow-lg z-40 md:hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {menuItems.map(item => (
                <Button key={item.label} variant="ghost" className="w-full justify-start text-gray-700 hover:bg-blue-50" onClick={() => { item.action(); setShowMenu(false); }}>
                  <item.icon className="w-5 h-5 mr-3 text-primary" />
                  {item.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
