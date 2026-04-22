import { Home, Search, Library } from 'lucide-react';

export function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-24 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around py-2 z-10">
      <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors px-4">
        <Home size={24} />
        <span className="text-xs">Home</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors px-4">
        <Search size={24} />
        <span className="text-xs">Search</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors px-4">
        <Library size={24} />
        <span className="text-xs">Library</span>
      </button>
    </div>
  );
}
