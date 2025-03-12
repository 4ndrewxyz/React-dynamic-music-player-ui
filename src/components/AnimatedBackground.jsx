import React from 'react';
import { motion } from 'framer-motion';
import '../styles/AnimatedBackground.css';

const AnimatedBackground = ({ colors }) => {
  // Use default colors if none provided
  const backgroundColors = colors && colors.length >= 3 
    ? colors 
    : ['#355c7d', '#6c5b7b', '#c06c84'];

  return (
    <div className="animated-background">
      {/* Single base layer gradient that doesn't animate - just for the background color */}
      <div 
        className="gradient-base"
        style={{
          background: `radial-gradient(circle at 30% 30%, 
            ${backgroundColors[0]} 0%, 
            ${backgroundColors[1]} 50%, 
            ${backgroundColors[2] || backgroundColors[0]} 100%)`
        }}
      />
      
      {/* Just two slowly moving large circles */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`large-circle-${i}`}
          className="gradient-circle large-circle"
          style={{
            background: `radial-gradient(circle at center, ${backgroundColors[i % backgroundColors.length]} 0%, transparent 70%)`,
            top: i === 0 ? '20%' : '60%',
            left: i === 0 ? '30%' : '70%',
            willChange: "transform",
            transform: "translateZ(0)"
          }}
          initial={{ scale: 1 }}
          animate={{
            // Very simple animation - just a slow pulse
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15 + i * 5,              
            ease: "easeInOut",         
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
      ))}
      
      {/* One medium-sized blob that moves very gently */}
      <motion.div
        key="medium-circle"
        className="gradient-circle medium-circle"
        style={{
          background: `radial-gradient(circle at center, ${backgroundColors[2 % backgroundColors.length]} 0%, transparent 70%)`,
          top: '40%',
          left: '50%',
          willChange: "transform",
          transform: "translateZ(0)"
        }}
        initial={{ x: 0, y: 0 }}
        animate={{
          // Simple movement
          x: [-30, 30, -30],
          y: [20, -20, 20]
        }}
        transition={{
          duration: 20,              
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      
      {/* Subtle overlay for contrast */}
      <div className="background-overlay" />
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(AnimatedBackground);