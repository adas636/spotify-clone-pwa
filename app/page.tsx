"use client"; // To bardzo ważne! Mówi Next.js, że używamy tutaj stanu (useState)

import { useState } from 'react';
// Zwróć uwagę na zaktualizowane ścieżki importu (używamy znaczka @, o ile Next.js tak to skonfigurował, lub ../)
import { Sidebar } from '../components/Sidebar';
import { PlaylistView, Song } from '../components/PlaylistView';
import { Player } from '../components/Player';
import { MobileNav } from '../components/MobileNav';
import { InstallPrompt } from '../components/InstallPrompt';
import { mockSongs } from '../data/mockData';

export default function Home() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  // Usunęliśmy useEffect z registerServiceWorker, bo robimy to przez bibliotekę next-pwa!

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
  };

  return (
    <div className="h-screen flex flex-col bg-black">
      <InstallPrompt />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <PlaylistView
          songs={mockSongs}
          onSongSelect={handleSongSelect}
          currentSong={currentSong}
        />
      </div>
      <MobileNav />
      <Player currentSong={currentSong} />
    </div>
  );
}