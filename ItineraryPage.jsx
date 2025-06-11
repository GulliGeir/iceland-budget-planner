import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, DollarSign, CalendarDays, MapPin, Plane, Hotel, Car, ShoppingBag, Edit, Share2, Download } from 'lucide-react';
import { format } from "date-fns";

const mockItineraryData = {
  flights: {
    provider: "Icelandair",
    details: "Round trip from JFK to KEF",
    price: 450,
    bookingLink: "#"
  },
  accommodation: {
    name: "The Reykjavik EDITION",
    type: "Luxury Hotel",
    nights: 5,
    pricePerNight: 300,
    bookingLink: "#"
  },
  rentalCar: {
    company: "Blue Car Rental",
    type: "4x4 SUV",
    days: 5,
    pricePerDay: 80,
    bookingLink: "#"
  },
  tours: [
    { name: "Golden Circle Classic Tour", provider: "Reykjavik Excursions", price: 90, bookingLink: "#" },
    { name: "Blue Lagoon Comfort Package", provider: "Blue Lagoon Iceland", price: 110, bookingLink: "#" },
  ],
  mustSees: [
    "Hallgrímskirkja Church", "Harpa Concert Hall", "Sun Voyager Sculpture", "Thingvellir National Park"
  ],
  dailyPlan: [
    { day: 1, title: "Arrival & Reykjavik Exploration", activities: ["Arrive at KEF, pick up rental car", "Check into hotel", "Explore downtown Reykjavik", "Dinner at a local restaurant"] },
    { day: 2, title: "Golden Circle Adventure", activities: ["Thingvellir National Park", "Geysir Geothermal Area", "Gullfoss Waterfall"] },
    { day: 3, title: "South Coast Wonders", activities: ["Seljalandsfoss Waterfall", "Skógafoss Waterfall", "Reynisfjara Black Sand Beach"] },
    { day: 4, title: "Relaxation & Culture", activities: ["Visit the Blue Lagoon", "Explore Reykjavik's museums", "Souvenir shopping"] },
    { day: 5, title: "Departure", activities: ["Enjoy a final Icelandic breakfast", "Drive to KEF airport", "Depart"] }
  ]
};

const ItineraryPage = () => {
  const [tripDetails, setTripDetails] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedDetails = localStorage.getItem('tripDetails');
    if (storedDetails) {
      const parsedDetails = JSON.parse(storedDetails);
      setTripDetails(parsedDetails);
      setItinerary(mockItineraryData); 
    } else {
      toast({
        title: "Oops! No trip details found.",
        description: "Please plan your trip first.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [navigate, toast]);

  if (!tripDetails || !itinerary) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
        />
        <p className="text-xl text-gray-700">Generating your personalized Iceland itinerary...</p>
      </div>
    );
  }

  const getTotalCost = () => {
    let total = 0;
    if (tripDetails.recommendations.includes('flights') && itinerary.flights) total += itinerary.flights.price;
    if (tripDetails.recommendations.includes('accommodation') && itinerary.accommodation) total += itinerary.accommodation.nights * itinerary.accommodation.pricePerNight;
    if (tripDetails.recommendations.includes('rentalCar') && itinerary.rentalCar) total += itinerary.rentalCar.days * itinerary.rentalCar.pricePerDay;
    if (tripDetails.recommendations.includes('tours') && itinerary.tours) {
      itinerary.tours.forEach(tour => total += tour.price);
    }
    return total;
  };
  
  const handleFeatureClick = (featureName) => {
    toast({
      title: `🚧 ${featureName} Feature`,
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Button variant="outline" onClick={() => navigate('/')} className="mb-4 sm:mb-0">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Planner
          </Button>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">Your Iceland Adventure!</h1>
          <p className="text-lg text-gray-600">Here's a personalized itinerary based on your selections.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => handleFeatureClick("Edit Itinerary")} aria-label="Edit Itinerary"><Edit className="h-5 w-5" /></Button>
          <Button variant="outline" size="icon" onClick={() => handleFeatureClick("Share Itinerary")} aria-label="Share Itinerary"><Share2 className="h-5 w-5" /></Button>
          <Button variant="default" size="icon" onClick={() => handleFeatureClick("Download Itinerary")} aria-label="Download Itinerary"><Download className="h-5 w-5" /></Button>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Trip Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6 text-lg">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-7 h-7 text-yellow-300" />
            <div>
              <p className="text-sm opacity-80">Budget</p>
              <p className="font-semibold">${tripDetails.budget}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarDays className="w-7 h-7 text-yellow-300" />
            <div>
              <p className="text-sm opacity-80">Dates</p>
              <p className="font-semibold">
                {tripDetails.travelDates.from ? format(new Date(tripDetails.travelDates.from), "MMM dd") : 'N/A'} - {tripDetails.travelDates.to ? format(new Date(tripDetails.travelDates.to), "MMM dd, yyyy") : 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-7 h-7 text-yellow-300" />
            <div>
              <p className="text-sm opacity-80">Region</p>
              <p className="font-semibold capitalize">{tripDetails.region ? tripDetails.region.replace('-', ' ') : 'N/A'}</p>
            </div>
          </div>
           <div className="flex items-center space-x-2">
            <DollarSign className="w-7 h-7 text-yellow-300" />
            <div>
              <p className="text-sm opacity-80">Est. Total Cost</p>
              <p className="font-semibold">${getTotalCost()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {tripDetails.recommendations.includes('flights') && itinerary.flights && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium flex items-center"><Plane className="mr-2 text-blue-500" /> Flights</CardTitle>
              <Button variant="link" asChild><a href={itinerary.flights.bookingLink} target="_blank" rel="noopener noreferrer">Book Now</a></Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{itinerary.flights.provider}: {itinerary.flights.details}</p>
              <p className="text-xl font-bold mt-1">${itinerary.flights.price}</p>
            </CardContent>
          </Card>
        )}
        {tripDetails.recommendations.includes('accommodation') && itinerary.accommodation && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium flex items-center"><Hotel className="mr-2 text-purple-500" /> Accommodation</CardTitle>
               <Button variant="link" asChild><a href={itinerary.accommodation.bookingLink} target="_blank" rel="noopener noreferrer">Book Now</a></Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{itinerary.accommodation.name} ({itinerary.accommodation.type}) - {itinerary.accommodation.nights} nights</p>
              <p className="text-xl font-bold mt-1">${itinerary.accommodation.pricePerNight}/night</p>
            </CardContent>
          </Card>
        )}
        {tripDetails.recommendations.includes('rentalCar') && itinerary.rentalCar && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium flex items-center"><Car className="mr-2 text-green-500" /> Rental Car</CardTitle>
               <Button variant="link" asChild><a href={itinerary.rentalCar.bookingLink} target="_blank" rel="noopener noreferrer">Book Now</a></Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{itinerary.rentalCar.company} - {itinerary.rentalCar.type} ({itinerary.rentalCar.days} days)</p>
              <p className="text-xl font-bold mt-1">${itinerary.rentalCar.pricePerDay}/day</p>
            </CardContent>
          </Card>
        )}
      </div>

      {tripDetails.recommendations.includes('tours') && itinerary.tours && itinerary.tours.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center"><ShoppingBag className="mr-2 text-orange-500" /> Tours & Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {itinerary.tours.map((tour, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium text-gray-800">{tour.name}</p>
                  <p className="text-sm text-gray-500">{tour.provider} - ${tour.price}</p>
                </div>
                <Button variant="outline" size="sm" asChild><a href={tour.bookingLink} target="_blank" rel="noopener noreferrer">View Tour</a></Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Daily Itinerary</CardTitle>
          <CardDescription>A suggested plan for your Icelandic journey.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {itinerary.dailyPlan.map((dayPlan) => (
            <div key={dayPlan.day} className="border-l-4 border-blue-500 pl-4 py-2 bg-slate-50 rounded-r-md">
              <h3 className="text-xl font-semibold text-blue-700">Day {dayPlan.day}: {dayPlan.title}</h3>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 pl-2">
                {dayPlan.activities.map((activity, i) => (
                  <li key={i}>{activity}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {itinerary.mustSees && itinerary.mustSees.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Must-See Spots in the Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {itinerary.mustSees.map((spot, index) => (
                <span key={index} className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                  {spot}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default ItineraryPage;