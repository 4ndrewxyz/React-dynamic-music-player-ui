import React, { useState, useEffect, useRef, useCallback } from 'react';
import LavaLampBlobs from './LavaLampBlobs.jsx';
import Controls from './Controls.jsx'; // Import the new Controls component
import { getPalette } from 'color-thief-react';
import AnimatedBackground from './AnimatedBackground';
import '../styles/ProgressBar.css';
import ProgressBar from './ProgressBar';
import SquigglyProgressBar from './SquigglyProgressBar';
import '../styles/SquigglyProgressBar.css';
import tracks from '../data/tracks.js';
import '../styles/MusicPlayer.css';
import '../styles/AnimatedBackground.css';
import '../styles/Controls.css'; // Import the Controls CSS

const MusicPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [colors, setColors] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef(new Audio(currentTrack.audioSrc));
  const intervalRef = useRef(null);

  // Memoize the nextTrack function
  const nextTrack = useCallback(() => {
    const newIndex = (trackIndex + 1) % tracks.length;
    setTrackIndex(newIndex);
    setCurrentTrack(tracks[newIndex]);
  }, [trackIndex]);

  // Memoize previous track function as well
  const prevTrack = useCallback(() => {
    const newIndex = (trackIndex - 1 + tracks.length) % tracks.length;
    setTrackIndex(newIndex);
    setCurrentTrack(tracks[newIndex]);
  }, [trackIndex]);

  // Memoize the startTimer function
  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        nextTrack();
      } else {
        setCurrentTime(audioRef.current.currentTime);
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    }, 1000);
  }, [nextTrack]);

  // Extract colors from album art
  useEffect(() => {
    const fetchColors = async () => {
      try {
        // Extract base colors from the album art
        const palette = await getPalette(currentTrack.albumArt, 3, 'hex', {
          crossOrigin: 'anonymous',
          quality: 10,
        });
        
        // Filter out white/very light colors
        const filteredBase = palette.filter(color => {
          const hex = color.replace('#', '');
          const r = parseInt(hex.substr(0, 2), 16);
          const g = parseInt(hex.substr(2, 2), 16);
          const b = parseInt(hex.substr(4, 2), 16);
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
          return brightness < 180;
        });
        
        // If we have at least one good color, generate variations
        if (filteredBase.length > 0) {
          const generatedPalette = generateColorVariations(filteredBase);
          setColors(generatedPalette);
        } else {    
          // Fallback to preset vibrant colors
          setColors(['#355c7d', '#6c5b7b', '#c06c84', '#f67280', '#f8b195']);
        }
      } catch (error) {
        console.error('Failed to extract colors:', error);
        setColors(['#355c7d', '#6c5b7b', '#c06c84', '#f67280', '#f8b195']);
      }
    };
    
    fetchColors();
  }, [currentTrack.albumArt]);
  
  // Your color variation generation function
  const generateColorVariations = (baseColors) => {
    // Your existing implementation
    const result = [];
    
    // Ensure we only work with non-white colors
    const nonWhiteColors = baseColors.filter(color => {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
      
      // Stricter brightness threshold to avoid light colors
      return brightness < 160;
    });
    
    // If no valid colors, use preset colors
    if (nonWhiteColors.length === 0) {
      return ['#355c7d', '#6c5b7b', '#c06c84', '#f67280', '#f8b195', '#3f51b5', '#7e57c2', '#4caf50'];
    }
    
    // Add the filtered base colors
    result.push(...nonWhiteColors);
    
    // For each valid color, generate multiple variations
    nonWhiteColors.forEach(color => {
      // Extract RGB
      const hex = color.replace('#', '');
      let r = parseInt(hex.substr(0, 2), 16);
      let g = parseInt(hex.substr(2, 2), 16);
      let b = parseInt(hex.substr(4, 2), 16);
      
      // Generate a darker variant
      const darker = `#${Math.max(0, r - 40).toString(16).padStart(2, '0')}${
        Math.max(0, g - 40).toString(16).padStart(2, '0')}${
        Math.max(0, b - 40).toString(16).padStart(2, '0')}`;
      
      // Generate a more saturated variant
      // Increase the dominant color value
      let max = Math.max(r, g, b);
      let saturated;
      if (max === r) {
        saturated = `#${Math.min(255, r + 30).toString(16).padStart(2, '0')}${
          Math.max(0, g - 20).toString(16).padStart(2, '0')}${
          Math.max(0, b - 20).toString(16).padStart(2, '0')}`;
      } else if (max === g) {
        saturated = `#${Math.max(0, r - 20).toString(16).padStart(2, '0')}${
          Math.min(255, g + 30).toString(16).padStart(2, '0')}${
          Math.max(0, b - 20).toString(16).padStart(2, '0')}`;
      } else {
        saturated = `#${Math.max(0, r - 20).toString(16).padStart(2, '0')}${
          Math.max(0, g - 20).toString(16).padStart(2, '0')}${
          Math.min(255, b + 30).toString(16).padStart(2, '0')}`;
      }
      
      // Generate a shifted hue by rotating RGB values
      const shifted = `#${Math.min(255, b).toString(16).padStart(2, '0')}${
        Math.min(255, r).toString(16).padStart(2, '0')}${
        Math.min(255, g).toString(16).padStart(2, '0')}`;
        
      result.push(darker, saturated, shifted);
    });
    
    // Return up to 10 colors for more variety
    return result.slice(0, 10);
  };

  // Handle track loading and setup
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(currentTrack.audioSrc);
    
    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(audioRef.current.duration);
    });
    
    audioRef.current.addEventListener('ended', nextTrack);
    
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      startTimer();
    }
    
    return () => {
      audioRef.current.removeEventListener('loadedmetadata', () => {});
      audioRef.current.removeEventListener('ended', nextTrack);
      clearInterval(intervalRef.current);
    };
  }, [currentTrack, isPlaying, nextTrack, startTimer]);

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      startTimer();
    } else {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, [isPlaying, startTimer]);

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Change track position on progress bar click
  const onProgressChange = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
    const newTime = clickPosition * audioRef.current.duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(clickPosition * 100);
  };

  useEffect(() => {
    if (colors && colors.length > 0) {
      // Set primary and secondary colors for the gradient
      document.documentElement.style.setProperty('--color-primary', colors[0]);
      document.documentElement.style.setProperty('--color-secondary', colors[1] || colors[0]);
      
      // Extract RGB from first color for glow effects
      const hex = colors[0].replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      
      // Update CSS variable for dynamic glow
      document.documentElement.style.setProperty('--dynamic-glow-r', r);
      document.documentElement.style.setProperty('--dynamic-glow-g', g);
      document.documentElement.style.setProperty('--dynamic-glow-b', b);
    }
  }, [colors]);

  // Format time
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return "0:00";
  };

  return (
    <div className="player-container">
      {/* Animated background component */}
      <AnimatedBackground colors={colors} />
      <LavaLampBlobs colors={colors} />

      
      <div className="music-player">
        <div className="album-cover">
          <img 
            src={currentTrack.albumArt} 
            alt={`${currentTrack.album} cover`}
            crossOrigin="anonymous" 
          />
        </div>
        
        <div className="player-controls">
          <div className="track-info">
            <h2 className="track-title">{currentTrack.title}</h2>
            <p className="track-artist">{currentTrack.artist}</p>
          </div>
          
          <ProgressBar 
          currentTime={currentTime}
          duration={duration}
          onProgressChange={onProgressChange}
          formatTime={formatTime}
         />

          
          {/* Replace the original controls with our new animated Controls component */}
          <Controls 
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            prevTrack={prevTrack}
            nextTrack={nextTrack}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;