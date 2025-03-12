import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ProgressBar.css';

const ProgressBar = ({ currentTime, duration, onProgressChange, formatTime }) => {
  const progress = ((currentTime || 0) / (duration || 1)) * 100;
  
  return (
    <div className="progress-container">
      <div className="progress-bar" onClick={onProgressChange}>
        <motion.div 
          className="progress" 
          style={{ width: `${progress}%` }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "tween" }}
        >
          <motion.div 
            className="progress-handle"
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.8 }}
          />
        </motion.div>
      </div>
      <div className="time-info">
        <span className="current-time">{formatTime(currentTime)}</span>
        <span className="total-time">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;