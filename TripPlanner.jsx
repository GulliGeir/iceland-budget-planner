
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Calendar as CalendarIcon, DollarSign, MapPin as MapPinIcon, Plane, Hotel, Car, ShoppingBag, ArrowRight, Info } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const regions = [
  { id: 'capital', name: 'Capital Area (Reykjavík & surroundings)' },
  { id: 'south', name: 'South Iceland' },
  { id: 'east', name: 'East Iceland (Eastfjords)' },
  { id: 'north', name: 'North Iceland' },
  { id: 'west', name: 'West Iceland (Snaefellsnes Peninsula)' },
  { id: 'westfjords', name: 'Westfjords' },
];

const recommendationOptions = [
  { id: 'flights', name: 'Flights', icon: Plane },
  { id: 'accommodation', name: 'Accommodation', icon: Hotel },
  { id: 'rentalCar', name: 'Rental Car', icon: Car },
  { id: 'tours', name: 'Tours & Activities', icon: ShoppingBag },
];

const TripPlanner = () => {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState('');
  const [travelDates, setTravelDates] = useState({ from: undefined, to: undefined });
  const [region, setRegion] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleRecommendationToggle = (id) => {
    setRecommendations(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!budget || !travelDates.from || !travelDates.to || !region || recommendations.length === 0) {
      toast({
        title: "⚠️ Missing Information",
        description: "Please fill in all fields to plan your trip.",
        variant: "destructive",
      });
      return;
    }
    
    const tripDetails = { 
      budget, 
      travelDates: {
        from: travelDates.from ? travelDates.from.toISOString() : undefined,
        to: travelDates.to ? travelDates.to.toISOString() : undefined,
      }, 
      region, 
      recommendations 
    };
    localStorage.setItem('tripDetails', JSON.stringify(tripDetails));
    
    toast({
      title: "🎉 Trip Details Saved!",
      description: "We're generating your amazing Iceland itinerary...",
    });
    navigate('/itinerary');
  };

  const renderStepContent = () => {
    switch (step) {
      case 1: // Budget
        return (
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">What's your travel budget?</h2>
            <p className="text-gray-600 mb-6">Let us know your approximate budget per person (USD) for this Icelandic adventure!</p>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="number" 
                placeholder="e.g., 1500" 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)} 
                className="pl-10 text-lg py-6"
              />
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md flex items-start">
              <Info className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
              <p className="text-sm">This helps us tailor recommendations. Don't worry, we'll find great options for any budget!</p>
            </div>
          </motion.div>
        );
      case 2: // Travel Dates
        return (
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">When are you traveling?</h2>
            <p className="text-gray-600 mb-6">Select your arrival and departure dates.</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal py-6 text-lg",
                    !travelDates.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {travelDates.from ? (
                    travelDates.to ? (
                      <>
                        {format(travelDates.from, "LLL dd, y")} -{" "}
                        {format(travelDates.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(travelDates.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick your dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={travelDates?.from}
                  selected={travelDates}
                  onSelect={setTravelDates}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
             <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md flex items-start">
              <Info className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
              <p className="text-sm">Iceland's beauty shines year-round! Summer offers midnight sun, while winter brings Northern Lights.</p>
            </div>
          </motion.div>
        );
      case 3: // Region
        return (
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Where in Iceland will you explore?</h2>
            <p className="text-gray-600 mb-6">Choose the main region for your adventure.</p>
            <Select onValueChange={setRegion} value={region}>
              <SelectTrigger className="w-full text-lg py-6">
                <MapPinIcon className="mr-2 h-5 w-5 text-gray-400" />
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(r => (
                  <SelectItem key={r.id} value={r.id} className="text-md py-2">{r.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md flex items-start">
              <Info className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
              <p className="text-sm">Each region offers unique landscapes and experiences. From glaciers in the South to fjords in the East!</p>
            </div>
          </motion.div>
        );
      case 4: // Recommendations
        return (
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">What should we include?</h2>
            <p className="text-gray-600 mb-6">Select the types of recommendations you'd like for your trip.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendationOptions.map(opt => {
                const Icon = opt.icon;
                const isSelected = recommendations.includes(opt.id);
                return (
                  <motion.div
                    key={opt.id}
                    onClick={() => handleRecommendationToggle(opt.id)}
                    className={cn(
                      "flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200",
                      isSelected ? "bg-blue-500 text-white shadow-lg scale-105" : "bg-white hover:shadow-md"
                    )}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Checkbox checked={isSelected} id={opt.id} className="mr-3 h-5 w-5 border-gray-400 data-[state=checked]:bg-white data-[state=checked]:text-blue-500" />
                    <Icon className={cn("w-6 h-6 mr-3", isSelected ? "text-white" : "text-primary")} />
                    <Label htmlFor={opt.id} className={cn("text-lg font-medium cursor-pointer", isSelected ? "text-white" : "text-gray-700")}>{opt.name}</Label>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const progress = (step / 4) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-2xl"
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-blue-600">Step {step} of 4</p>
          <p className="text-sm font-medium text-gray-500">{Math.round(progress)}% Complete</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div 
            className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex justify-between items-center">
        <Button variant="outline" onClick={prevStep} disabled={step === 1} className="text-lg py-3 px-6">
          Back
        </Button>
        {step < 4 ? (
          <Button onClick={nextStep} className="text-lg py-3 px-6 bg-blue-600 hover:bg-blue-700">
            Next Step <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="text-lg py-3 px-6 bg-green-500 hover:bg-green-600">
            Plan My Trip! ✨
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default TripPlanner;
