import React from 'react';
import Hero from '../components/home/Hero';
import Specials from '../components/home/Specials';
import QuickOrder from '../components/home/QuickOrder';
import LocationHours from '../components/home/LocationHours';
import Testimonials from '../components/home/Testimonials';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Specials />
      <QuickOrder />
      <LocationHours />
      <Testimonials />
    </div>
  );
}