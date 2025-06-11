
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-200px)] p-4"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <AlertTriangle className="w-24 h-24 text-yellow-400 mb-8" />
      </motion.div>
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Oops! Page Not Found</h2>
      <p className="text-lg text-gray-500 mb-8 max-w-md">
        It seems like you've taken a wrong turn on your Icelandic adventure. The page you're looking for doesn't exist.
      </p>
      <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg py-3 px-6">
        <Link to="/">Take Me Home</Link>
      </Button>
       <div className="mt-12">
        <img
          className="max-w-xs md:max-w-sm rounded-lg shadow-xl"
          alt="Lost puffin looking at a map of Iceland"
         src="https://images.unsplash.com/photo-1508035262539-HR3193a217ee" />
      </div>
    </motion.div>
  );
};

export default NotFoundPage;
