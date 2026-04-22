import { Home, Search, Library, Plus, Heart } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="hidden md:flex w-60 bg-black text-white p-6 flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Spotify</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <button className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors w-full">
              <Home size={24} />
              <span>Home</span>
            </button>
          </li>
          <li>
            <button className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors w-full">
              <Search size={24} />
              <span>Search</span>
            </button>
          </li>
          <li>
            <button className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors w-full">
              <Library size={24} />
              <span>Your Library</span>
            </button>
          </li>
        </ul>

        <div className="mt-8 space-y-4">
          <button className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors w-full">
            <Plus size={24} />
            <span>Create Playlist</span>
          </button>
          <button className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors w-full">
            <Heart size={24} />
            <span>Liked Songs</span>
          </button>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-800">
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Rock Classics</li>
            <li className="hover:text-white cursor-pointer">Chill Vibes</li>
            <li className="hover:text-white cursor-pointer">Workout Mix</li>
            <li className="hover:text-white cursor-pointer">Jazz Essentials</li>
            <li className="hover:text-white cursor-pointer">Electronic Beats</li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
