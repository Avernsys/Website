"use client";

import { motion } from "framer-motion";

const members = [
  { x: 140, y: 120, delay: 0.8 },
  { x: 195, y: 95, delay: 1.0 },
  { x: 170, y: 170, delay: 1.1 },
  { x: 420, y: 110, delay: 1.2 },
  { x: 470, y: 150, delay: 1.3 },
  { x: 390, y: 165, delay: 1.0 },
  { x: 300, y: 220, delay: 1.4 },
  { x: 340, y: 260, delay: 0.9 },
  { x: 260, y: 270, delay: 1.5 },
  { x: 310, y: 310, delay: 1.1 },
  { x: 130, y: 340, delay: 1.6 },
  { x: 185, y: 370, delay: 1.7 },
  { x: 160, y: 290, delay: 1.3 },
  { x: 460, y: 320, delay: 1.8 },
  { x: 510, y: 360, delay: 2.0 },
];

const connections: [number, number][] = [
  [0, 1], [0, 2], [1, 2],
  [3, 4], [3, 5], [4, 5],
  [6, 7], [6, 8], [7, 9], [8, 9],
  [10, 11], [10, 12], [11, 12],
  [13, 14],
  [2, 8], [1, 6], [5, 7], [9, 12], [7, 13], [4, 14],
];

const clusterHalos = [
  { x: 168, y: 128, r: 60 },
  { x: 427, y: 142, r: 55 },
  { x: 303, y: 265, r: 65 },
  { x: 158, y: 333, r: 50 },
];

const pulses = [
  { from: 1, to: 6, delay: 3.5 },
  { from: 5, to: 7, delay: 4.1 },
  { from: 9, to: 12, delay: 4.7 },
  { from: 4, to: 14, delay: 5.3 },
];

export function ChapterSysHeroAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        viewBox="0 0 680 500"
        className="w-full h-full max-w-[680px] max-h-[500px] opacity-[0.35]"
        fill="none"
      >
        {/* Concentric radial grid */}
        {[80, 140, 200, 260].map((r, i) => (
          <motion.circle
            key={`grid-${i}`}
            cx="340"
            cy="250"
            r={r}
            stroke="white"
            strokeOpacity="0.025"
            strokeWidth="0.8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
          />
        ))}

        {/* Connection lines between nodes */}
        {connections.map(([a, b], i) => {
          const from = members[a];
          const to = members[b];
          return (
            <g key={`conn-${i}`}>
              <motion.line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="rgba(245,180,100,0.06)"
                strokeWidth="4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: 2.0 + i * 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <motion.line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="rgba(245,180,100,0.15)"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: 2.0 + i * 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </g>
          );
        })}

        {/* Cluster halos */}
        {clusterHalos.map((halo, i) => (
          <motion.circle
            key={`halo-${i}`}
            cx={halo.x}
            cy={halo.y}
            r={halo.r}
            fill="rgba(245,180,100,0.015)"
            stroke="rgba(245,180,100,0.04)"
            strokeWidth="0.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 3.0 + i * 0.2,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {/* Member nodes */}
        {members.map((member, i) => (
          <g key={`member-${i}`}>
            {i % 4 === 0 && (
              <motion.circle
                cx={member.x}
                cy={member.y}
                r="14"
                fill="none"
                stroke="rgba(245,180,100,0.12)"
                strokeWidth="1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 1.5],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  delay: member.delay + 2.5,
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeOut",
                }}
              />
            )}
            <motion.circle
              cx={member.x}
              cy={member.y}
              r="8"
              fill="none"
              stroke="rgba(245,180,100,0.2)"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: member.delay,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <motion.circle
              cx={member.x}
              cy={member.y}
              r="3"
              fill="rgba(245,180,100,0.5)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: member.delay,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </g>
        ))}

        {/* Traveling pulse dots along cross-cluster connections */}
        {pulses.map((pulse, i) => {
          const from = members[pulse.from];
          const to = members[pulse.to];
          return (
            <motion.circle
              key={`travel-${i}`}
              r="3"
              fill="rgba(245,180,100,0.7)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                delay: pulse.delay,
                duration: 1.2,
                ease: "linear",
              }}
            >
              <animateMotion
                dur="1.2s"
                begin={`${pulse.delay}s`}
                fill="freeze"
                path={`M${from.x},${from.y} L${to.x},${to.y}`}
                repeatCount="1"
              />
            </motion.circle>
          );
        })}
      </svg>
    </div>
  );
}
