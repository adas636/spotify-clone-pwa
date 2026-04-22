import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart } from 'lucide-react';
import { Slider } from './ui/slider';

interface PlayerProps {
  currentSong: {
    title: string;
    artist: string;
    album: string;
    cover: string;
    duration: number;
  } | null;
}

export function Player({ currentSong }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isLiked, setIsLiked] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && currentSong) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentSong.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentSong]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  if (!currentSong) {
    return (
      <div className="h-24 bg-gray-900 border-t border-gray-800 flex items-center justify-center text-gray-500">
        Select a song to play
      </div>
    );
  }

  return (
    <div className="h-24 bg-gray-900 border-t border-gray-800 px-2 md:px-4 flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4 w-40 md:w-80">
        <img src={currentSong.cover} alt={currentSong.album} className="w-12 h-12 md:w-14 md:h-14 rounded" />
        <div className="flex-1 min-w-0 hidden md:block">
          <p className="text-white truncate text-sm">{currentSong.title}</p>
          <p className="text-gray-400 text-xs truncate">{currentSong.artist}</p>
        </div>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`hidden md:block ${isLiked ? 'text-green-500' : 'text-gray-400'} hover:text-white transition-colors`}
        >
          <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex-1 max-w-2xl px-2">
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-2">
          <button className="hidden md:block text-gray-400 hover:text-white transition-colors">
            <Shuffle size={18} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipBack size={18} />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipForward size={18} />
          </button>
          <button className="hidden md:block text-gray-400 hover:text-white transition-colors">
            <Repeat size={18} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 w-8 md:w-10 text-right">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={currentSong.duration}
            step={1}
            onValueChange={handleProgressChange}
            className="flex-1"
          />
          <span className="text-xs text-gray-400 w-8 md:w-10">{formatTime(currentSong.duration)}</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 w-80 justify-end">
        <Volume2 size={20} className="text-gray-400" />
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={(value) => setVolume(value[0])}
          className="w-24"
        />
      </div>
    </div>
  );
}
