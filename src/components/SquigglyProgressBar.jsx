import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/SquigglyProgressBar.css';

const SquigglyProgressBar = ({ currentTime, duration, onProgressChange, formatTime }) => {
  const progress = ((currentTime || 0) / (duration || 1));
  const svgRef = useRef(null);

  // Handle click on the SVG to update progress
  const handleClick = (e) => {
    if (!svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    
    // Ensure click position is between 0 and 1
    const newPosition = Math.max(0, Math.min(1, clickPosition));
    
    // Call the parent's progress change handler
    if (onProgressChange) {
      onProgressChange({
        currentTarget: svgRef.current,
        clientX: e.clientX
      });
    }
  };

  
  // Generate a squiggly path with number of waves based on duration
  const generateSquigglyPath = () => {
    const width = 100;
    const height = 30;
    const waveCount = Math.min(20, Math.max(5, Math.floor(duration / 10))); // 1 wave per 10 seconds, min 5, max 20
    const waveWidth = width / waveCount;
    const amplitude = 6; // Height of waves
    
    let path = `M 0,${height/2} `;
    
    for (let i = 0; i < waveCount; i++) {
      const x1 = i * waveWidth + waveWidth / 4;
      const x2 = i * waveWidth + waveWidth * 3 / 4;
      const x3 = (i + 1) * waveWidth;
      
      const y1 = height / 2 - amplitude;
      const y2 = height / 2 + amplitude;
      const y3 = height / 2;
      
      // Create a wave using cubic bezier curves
      path += `C ${x1},${y1} ${x2},${y2} ${x3},${y3} `;
    }
    
    return path;
  };

  // Path data for the squiggly line
  const squigglyPath = generateSquigglyPath();

  return (
    <div className="squiggly-progress-container">
      <div className="squiggly-svg-container" onClick={handleClick} ref={svgRef}>
        <svg
          viewBox="0 0 100 30"
          preserveAspectRatio="none"
          className="squiggly-progress-svg"
        >
          {/* Background path - full squiggly line in gray */}
          <motion.path
            d={squigglyPath}
            fill="none"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="rgba(255, 255, 255, 0.2)"
            className="squiggly-background"
          />
          
          {/* Animated progress path */}
          <svg width="100%" height="100%">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-primary, #ffffff)" />
                <stop offset="100%" stopColor="var(--color-secondary, #ffffff)" />
              </linearGradient>
              <clipPath id="progressClip">
                <rect x="0" y="0" width={`${progress * 100}%`} height="100%" />
              </clipPath>
            </defs>
            
            <g clipPath="url(#progressClip)">
              <motion.path
                d={squigglyPath}
                fill="none"
                strokeLinecap="round"
                strokeWidth="3"
                stroke="url(#progressGradient)"
                className="squiggly-progress"
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: 1,
                  // Adding subtle "dancing" animation to the squiggle
                  y: [0, -1, 0, 1, 0],
                }}
                transition={{
                  pathLength: { duration: 0.5, ease: "easeInOut" },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </g>
            
            {/* Progress handle */}
            <motion.circle
              cx={`${progress * 100}%`}
              cy="15"
              r="5"
              fill="white"
              filter="drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))"
              className="squiggly-handle"
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                x: [0, 0.5, 0, -0.5, 0], // Subtle horizontal wiggle
                y: [0, -1, 0, 1, 0], // Subtle vertical wiggle
              }}
              transition={{ 
                scale: { duration: 0.2 },
                x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.25 }
              }}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 1.8 }}
            />
          </svg>
        </svg>
      </div>
      
      <div className="time-info">
        <span className="current-time">{formatTime(currentTime)}</span>
        <span className="total-time">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default SquigglyProgressBar;