import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Controls.css';

const Controls = ({ isPlaying, togglePlay, prevTrack, nextTrack }) => {
  return (
    <div className="control-buttons">
      {/* Previous button with left shift animation */}
      <motion.button 
        className="control-button prev-button"
        onClick={prevTrack}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, x: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
        </svg>
      </motion.button>
      
      {/* Play/Pause button with bounce animation */}
      <motion.button 
        className="control-button play-button"
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: isPlaying ? [1, 1.2, 1] : 1,
          rotate: isPlaying ? [0, 0, 0] : [0, 360, 0]
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          times: isPlaying ? [0, 0.2, 0.5] : [0, 0.6, 1]
        }}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </motion.button>
      
      {/* Next button with right shift animation */}
      <motion.button 
        className="control-button next-button"
        onClick={nextTrack}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, x: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
        </svg>
      </motion.button>
    </div>
  );
};

export default Controls;