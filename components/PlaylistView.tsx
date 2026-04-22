import { Play, Clock } from 'lucide-react';

export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
}

interface PlaylistViewProps {
  songs: Song[];
  onSongSelect: (song: Song) => void;
  currentSong: Song | null;
}

export function PlaylistView({ songs, onSongSelect, currentSong }: PlaylistViewProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-green-900 to-black text-white overflow-auto pb-16 md:pb-0">
      <div className="p-4 md:p-8">
        <div className="flex items-end gap-4 md:gap-6 mb-6 md:mb-8">
          <img
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop"
            alt="Playlist cover"
            className="w-32 h-32 md:w-56 md:h-56 shadow-2xl"
          />
          <div>
            <p className="text-xs md:text-sm uppercase">Playlist</p>
            <h1 className="text-3xl md:text-6xl font-bold my-2 md:my-4">Today's Top Hits</h1>
            <p className="text-xs md:text-sm text-gray-300 hidden md:block">Your daily update of the most played tracks</p>
            <p className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">{songs.length} songs</p>
          </div>
        </div>

        <div className="bg-black bg-opacity-30 rounded-lg">
          <div className="hidden md:grid grid-cols-[auto_2fr_2fr_1fr_auto] gap-4 px-4 py-2 border-b border-gray-800 text-sm text-gray-400">
            <div className="w-8">#</div>
            <div>Title</div>
            <div>Album</div>
            <div>Duration</div>
            <div className="w-4">
              <Clock size={16} />
            </div>
          </div>

          {songs.map((song, index) => (
            <div
              key={song.id}
              onClick={() => onSongSelect(song)}
              className={`grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_2fr_2fr_1fr_auto] gap-3 md:gap-4 px-3 md:px-4 py-3 hover:bg-white hover:bg-opacity-10 cursor-pointer transition-colors ${
                currentSong?.id === song.id ? 'bg-white bg-opacity-10' : ''
              }`}
            >
              <div className="w-8 flex items-center justify-center text-gray-400">
                {currentSong?.id === song.id ? (
                  <Play size={14} fill="currentColor" className="text-green-500" />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <img src={song.cover} alt={song.album} className="w-10 h-10" />
                <div className="min-w-0">
                  <p className={`truncate ${currentSong?.id === song.id ? 'text-green-500' : 'text-white'}`}>
                    {song.title}
                  </p>
                  <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                </div>
              </div>
              <div className="hidden md:flex items-center text-gray-400">{song.album}</div>
              <div className="flex items-center text-gray-400 text-sm">{formatDuration(song.duration)}</div>
              <div className="w-4 hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
