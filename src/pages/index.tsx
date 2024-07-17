import { useState, useEffect } from 'react';
import Card from '../components/Card';

type Geocache = {
  name: string;
  latitude: string;
  longitude: string;
  description: string;
};

export default function Home() {
  const [caches, setCaches] = useState<Geocache[]>([]);

  useEffect(() => {
    async function fetchCaches() {
      try {
        const response = await fetch('/api/get-caches');
        if (!response.ok) {
          throw new Error('Failed to fetch caches');
        }
        const data = await response.json();
        setCaches(data.caches);
      } catch (error) {
        console.error('Error fetching caches:', error);
      }
    }

    fetchCaches();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-emerald-600 dark:bg-emerald-800 text-slate-100 py-4 px-6">
        <h1 className="text-2xl font-bold">CryptoCache</h1>
      </header>
      <div className="p-6">
        <Card 
          key={"title"}
          title={"Welcome!"}
          description={"I got tired of all the muggles finding my geocaches... So I made this new site that logs caches I've found hidden behind hashed values! Find the cache first to see if your hash matches mine! Then you'll know if we have found the same cache! I will only share the hash algorithm with my friends :) or people skillful enough to understand my incredible source code! There may be some caches too great to share on this page ;)"}
        />
      </div>
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {caches.map((cache, index) => (
            <Card
              key={index}
              title={cache.name}
              description={cache.description}
              latitude={cache.latitude}
              longitude={cache.longitude}
              // buttonText="View Details (button TODO)"
            />
          ))}
        </div>
      </main>
      <footer className="bg-emerald-600 dark:bg-emerald-800 text-slate-100 py-4 px-6 text-center">
  <p className="text-sm">
    This site is proudly powered by Open Source Software. <a href="https://github.com/emiliarepo/cryptocache" className="text-white underline">GitHub Repository</a>.
  </p>
  <p className="text-sm">
    <strong>Disclaimer:</strong> This page is purely fictional, and the caches on this page point to bogus locations.
  </p>
</footer>

    </div>
    
  )
}
