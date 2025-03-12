import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/LavaLampBlobs.css';

const LavaLampBlobs = ({ colors }) => {
  const backgroundColors = colors && colors.length >= 3 
    ? colors 
    : ['#ff0066', '#9933ff', '#00ccff']; // Vibrant fallback colors
  
  // Create refs for blob elements
  const blobRefs = useRef([]);

  return (
    <div className="lava-lamp-container">
      {/* SVG Filters for more organic blob shapes */}
      <svg className="blob-filters">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="gooey" />
          </filter>
          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      
      {/* Bottom resting blobs - reduced to 2 */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`blob-base-${i}`}
          className="lava-blob base-blob"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${backgroundColors[i % backgroundColors.length]}, ${backgroundColors[(i + 1) % backgroundColors.length]} 85%)`,
            left: `${15 + (i * 45)}%`,
          }}
          initial={{
            y: 0,
            scale: 1.1,
            borderRadius: "60% 40% 60% 40% / 60% 40% 60% 40%",
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1.1, 1.15, 1.1],
            borderRadius: [
              "60% 40% 60% 40% / 60% 40% 60% 40%",
              "55% 45% 55% 45% / 55% 45% 55% 45%",
              "60% 40% 60% 40% / 60% 40% 60% 40%",
            ]
          }}
          transition={{
            duration: 15 + i * 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}
      
      {/* Rising and falling large blobs - reduced to 3 with simpler animations */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`blob-large-${i}`}
          className="lava-blob large-blob"
          ref={el => blobRefs.current[i] = el}
          style={{
            background: `radial-gradient(circle at 40% 40%, ${backgroundColors[(i + 2) % backgroundColors.length]}, ${backgroundColors[(i + 3) % backgroundColors.length]} 90%)`,
            left: `${20 + (i * 25)}%`,
            willChange: "transform, border-radius",
            transform: "translate3d(0,0,0)",
          }}
          initial={{
            y: 0,
            scale: 0.9,
            borderRadius: "60% 40% 70% 30% / 60% 30% 70% 40%",
          }}
          animate={{
            // Simplified y keyframes
            y: [
              0,           // Start at base position
              -500,        // Rise high
              -520,        // Slight wobble at top
              0            // Fall back to start
            ],
            scale: [
              0.9,    // Start slightly compressed
              1.2,    // Expand while rising
              1.15,   // Slight pulse at top
              0.9     // Compress at bottom
            ],
            borderRadius: [
              "60% 40% 70% 30% / 60% 30% 70% 40%", // Start shape
              "70% 30% 50% 50% / 30% 60% 40% 70%", // Rising shape
              "65% 35% 55% 45% / 40% 50% 50% 60%", // Top shape
              "60% 40% 70% 30% / 60% 30% 70% 40%", // End shape
            ]
          }}
          transition={{
            duration: 18 + i * 4, // Longer duration for more visible rise and fall
            ease: [0.45, 0.05, 0.55, 0.95], // Custom easing for slower rise, faster fall
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.4, 0.5, 1], // Simplified timing
            delay: i * 7, // Larger stagger for less CPU usage at once
          }}
        />
      ))}
      
      {/* Medium sized blobs - reduced to 2 with simpler animations */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`blob-medium-${i}`}
          className="lava-blob medium-blob"
          style={{
            background: `radial-gradient(circle at 60% 60%, ${backgroundColors[(i + 1) % backgroundColors.length]}, ${backgroundColors[(i + 2) % backgroundColors.length]} 90%)`,
            left: `${30 + (i * 35)}%`,
            willChange: "transform",
          }}
          initial={{
            y: 0,
            scale: 0.7,
            borderRadius: "50% 50% 40% 60% / 40% 50% 50% 60%",
          }}
          animate={{
            // Simplified keyframes
            y: [
              0,        // Start position
              -300,     // Rise higher
              -320,     // Near top
              0         // Return to base
            ],
            scale: [
              0.7, 0.85, 0.8, 0.7
            ],
            borderRadius: [
              "50% 50% 40% 60% / 40% 50% 50% 60%",
              "60% 40% 50% 50% / 50% 60% 40% 50%",
              "55% 45% 40% 60% / 45% 55% 60% 40%",
              "50% 50% 40% 60% / 40% 50% 50% 60%",
            ]
          }}
          transition={{
            duration: 15 + i * 5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.4, 0.5, 1], // Simplified timing
            delay: i * 8 + 3, // Offset from the large blobs
          }}
        />
      ))}
      
      {/* Small bubble blobs - reduced to 6 with better performance */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`blob-bubble-${i}`}
          className="lava-blob bubble-blob"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${backgroundColors[(i + 1) % backgroundColors.length]}, ${backgroundColors[(i + 2) % backgroundColors.length]} 90%)`,
            left: `${15 + (i * 12)}%`, // More spread
            opacity: 0.85,
            willChange: "transform, opacity",
          }}
          initial={{
            y: 0,
            scale: 0.3,
            borderRadius: "50%"
          }}
          animate={{
            // Simpler animation with fewer keyframes
            y: [0, -600], // Rise from bottom to beyond top
            scale: [0.3, 0.4, 0], // Simpler scale change
            opacity: [0.85, 0.9, 0], // Simpler opacity change
          }}
          transition={{
            duration: 12 - i * 0.8, // Faster for smaller bubbles
            ease: "easeOut", // Ease out for natural deceleration as they rise
            repeat: Infinity,
            repeatType: "loop",
            delay: i * 3, // More staggered to reduce simultaneous animations
            times: [0, 0.8, 1], // Simplified timing array
          }}
        />
      ))}
      
      {/* Tiny bubble clusters - reduced to 5 with better optimization */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`blob-tiny-${i}`}
          className="lava-blob tiny-blob"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${backgroundColors[(i + 3) % backgroundColors.length]}, ${backgroundColors[(i + 2) % backgroundColors.length]} 90%)`,
            left: `${40 + (i * 10)}%`,
            opacity: 0.7,
            willChange: "transform, opacity",
          }}
          initial={{
            y: 0,
            scale: 0.15,
            borderRadius: "50%"
          }}
          animate={{
            // Simpler animation with fewer keyframes
            y: [0, -550], // Rise from bottom to beyond top
            scale: [0.15, 0.2, 0], // Simpler scale change
            opacity: [0.7, 0.8, 0], // Simpler opacity change
          }}
          transition={{
            duration: 8 - i * 0.5,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: i * 4 + 5, // More staggered
            times: [0, 0.8, 1], // Simplified timing array
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(LavaLampBlobs); // Use memo to prevent unnecessary re-renders